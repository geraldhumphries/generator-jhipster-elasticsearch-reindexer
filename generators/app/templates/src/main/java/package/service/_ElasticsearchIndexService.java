package <%=packageName%>.service;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.annotation.JsonIgnore;
import <%=packageName%>.domain.*;
import <%=packageName%>.repository.*;
import <%=packageName%>.repository.search.*;
import org.elasticsearch.indices.IndexAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

<%_ if (jhipsterMajorVersion < 4) { _%>
import javax.inject.Inject;
<%_ } _%>
import javax.persistence.ManyToMany;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ElasticsearchIndexService {

    private static final Lock reindexLock = new ReentrantLock();

    private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexService.class);

<%_ if (jhipsterMajorVersion >= 4) { _%>
    <%_ if (applicationType === 'monolith' || applicationType === 'microservice') {
            entityFiles.forEach(function (file) {
                var entity = file.split('.json')[0];
                var entityLowerCase = entity.charAt(0).toLowerCase() + entity.slice(1); _%>
    private final <%=entity%>Repository <%=entityLowerCase%>Repository;

    private final <%=entity%>SearchRepository <%=entityLowerCase%>SearchRepository;

    <%_     });
        }
        if (!skipUserManagement && (applicationType === 'monolith' || applicationType === 'gateway')) { _%>
    private final UserRepository userRepository;

    private final UserSearchRepository userSearchRepository;

    <%_ } _%>
    private final ElasticsearchTemplate elasticsearchTemplate;

    public ElasticsearchIndexService(
        <%_ if (!skipUserManagement && (applicationType === 'monolith' || applicationType === 'gateway')) { _%>
        UserRepository userRepository,
        UserSearchRepository userSearchRepository,
        <%_ } _%>
        <%_ if (applicationType === 'monolith' || applicationType === 'microservice') {
            entityFiles.forEach(function (file) {
                var entity = file.split('.json')[0];
                var entityLowerCase = entity.charAt(0).toLowerCase() + entity.slice(1); _%>
        <%=entity%>Repository <%=entityLowerCase%>Repository,
        <%=entity%>SearchRepository <%=entityLowerCase%>SearchRepository,
        <%_
            });
        } _%>
        ElasticsearchTemplate elasticsearchTemplate) {
        <%_ if (!skipUserManagement && (applicationType === 'monolith' || applicationType === 'gateway')) { _%>
        this.userRepository = userRepository;
        this.userSearchRepository = userSearchRepository;
        <%_ } _%>
        <%_ if (applicationType === 'monolith' || applicationType === 'microservice') {
            entityFiles.forEach(function (file) {
                var entity = file.split('.json')[0];
                var entityLowerCase = entity.charAt(0).toLowerCase() + entity.slice(1); _%>
        this.<%=entityLowerCase%>Repository = <%=entityLowerCase%>Repository;
        this.<%=entityLowerCase%>SearchRepository = <%=entityLowerCase%>SearchRepository;
        <%_
            });
        } _%>
        this.elasticsearchTemplate = elasticsearchTemplate;
    }
<%_ } else if (jhipsterMajorVersion < 4) { _%>
    <%_ if (applicationType === 'monolith' || applicationType === 'microservice') {
            entityFiles.forEach(function (file) {
              var entity = file.split('.json')[0];
              var entityLowerCase = entity.charAt(0).toLowerCase() + entity.slice(1); _%>
    @Inject
    private <%=entity%>Repository <%=entityLowerCase%>Repository;

    @Inject
    private <%=entity%>SearchRepository <%=entityLowerCase%>SearchRepository;

    <%_     });
    }
    if (!skipUserManagement && (applicationType === 'monolith' || applicationType === 'gateway')) { _%>
    @Inject
    private UserRepository userRepository;

    @Inject
    private UserSearchRepository userSearchRepository;

    <%_ } _%>
    @Inject
    private ElasticsearchTemplate elasticsearchTemplate;
<%_ } _%>

    @Async
    @Timed
    public void reindexSelected(List<String> classesForReindex) {
        if (reindexLock.tryLock()) {
            try {
        <%_ if (!applicationType || applicationType === 'monolith' || applicationType === 'microservice') {
                entityFiles.forEach(function (file) {
                    var entity = file.split('.json')[0];
                    var entityLowerCase = entity.charAt(0).toLowerCase() + entity.slice(1); _%>
                if (classesForReindex.contains("<%=entity%>")) {
                    reindexForClass(<%=entity%>.class, <%=entityLowerCase%>Repository, <%=entityLowerCase%>SearchRepository);
                }
        <%_     });
            }
            if (!skipUserManagement && (!applicationType || applicationType === 'monolith' || applicationType === 'gateway')) { _%>
                reindexForClass(User.class, userRepository, userSearchRepository);
        <%_ } _%>

                log.info("Elasticsearch: Successfully performed reindexing");
            } finally {
                reindexLock.unlock();
            }
        } else {
            log.info("Elasticsearch: concurrent reindexing attempt");
        }
    }


    @Async
    @Timed
    public void reindexAll() {
        if (reindexLock.tryLock()) {
            try {
        <%_ if (!applicationType || applicationType === 'monolith' || applicationType === 'microservice') {
                entityFiles.forEach(function (file) {
                    var entity = file.split('.json')[0];
                    var entityLowerCase = entity.charAt(0).toLowerCase() + entity.slice(1); _%>
                reindexForClass(<%=entity%>.class, <%=entityLowerCase%>Repository, <%=entityLowerCase%>SearchRepository);
        <%_     });
            }
            if (!skipUserManagement && (!applicationType || applicationType === 'monolith' || applicationType === 'gateway')) { _%>
                reindexForClass(User.class, userRepository, userSearchRepository);
        <%_ } _%>

                log.info("Elasticsearch: Successfully performed reindexing");
            } finally {
                reindexLock.unlock();
            }
        } else {
            log.info("Elasticsearch: concurrent reindexing attempt");
        }
    }

    @SuppressWarnings("unchecked")
    private <T, ID extends Serializable> void reindexForClass(Class<T> entityClass, JpaRepository<T, ID> jpaRepository,
                                                              ElasticsearchRepository<T, ID> elasticsearchRepository) {
        elasticsearchTemplate.deleteIndex(entityClass);
        try {
            elasticsearchTemplate.createIndex(entityClass);
        } catch (IndexAlreadyExistsException e) {
            // Do nothing. Index was already concurrently recreated by some other service.
        }
        elasticsearchTemplate.putMapping(entityClass);
        if (jpaRepository.count() > 0) {
            // if a JHipster entity field is the owner side of a many-to-many relationship, it should be loaded manually
            List<Method> relationshipGetters = Arrays.stream(entityClass.getDeclaredFields())
                .filter(field -> field.getType().equals(Set.class))
                .filter(field -> field.getAnnotation(ManyToMany.class) != null)
                .filter(field -> field.getAnnotation(ManyToMany.class).mappedBy().isEmpty())
                .filter(field -> field.getAnnotation(JsonIgnore.class) == null)
                .map(field -> {
                    try {
                        return new PropertyDescriptor(field.getName(), entityClass).getReadMethod();
                    } catch (IntrospectionException e) {
                        log.error("Error retrieving getter for class {}, field {}. Field will NOT be indexed",
                            entityClass.getSimpleName(), field.getName(), e);
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

            int size = 100;
            for (int i = 0; i <= jpaRepository.count() / size; i++) {
            <%_ if (jhipsterMajorVersion <= 4) { _%>
                Pageable page = new PageRequest(i, size);
            <%_ } else if (jhipsterMajorVersion > 4) {
                Pageable page = PageRequest.of(i, size);
            <%_ } _ %>
                log.info("Indexing page {} of {}, size {}", i, jpaRepository.count() / size, size);
                Page<T> results = jpaRepository.findAll(page);
                results.map(result -> {
                    // if there are any relationships to load, do it now
                    relationshipGetters.forEach(method -> {
                        try {
                            // eagerly load the relationship set
                            ((Set) method.invoke(result)).size();
                        } catch (Exception ex) {
                            log.error(ex.getMessage());
                        }
                    });
                    return result;
                });
                elasticsearchRepository.save(results.getContent());
            }
        }
        log.info("Elasticsearch: Indexed all rows for {}", entityClass.getSimpleName());
    }
}
