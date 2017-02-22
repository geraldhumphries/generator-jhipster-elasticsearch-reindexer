package <%=packageName%>.service;

import com.codahale.metrics.annotation.Timed;
import <%=packageName%>.domain.*;
import <%=packageName%>.repository.*;
import <%=packageName%>.repository.search.*;
import org.elasticsearch.indices.IndexAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Method;
import java.util.List;

@Service
public class ElasticsearchIndexService {

    private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexService.class);

    <%_ if (applicationType === 'monolith' || applicationType === 'microservice') {
            entityFiles.forEach(function (file) {
                var entity = file.split('.json')[0];
                var entityLowerCase = entity.charAt(0).toLowerCase() + entity.slice(1); _%>
    private final <%=entity%>Repository <%=entityLowerCase%>Repository;

    private final <%=entity%>SearchRepository <%=entityLowerCase%>SearchRepository;

    <%_     });
        }
        if (applicationType === 'monolith' || applicationType === 'gateway') { _%>
    private final UserRepository userRepository;

    private final UserSearchRepository userSearchRepository;

    <%_ } _%>
    private final ElasticsearchTemplate elasticsearchTemplate;

    public ElasticsearchIndexService (<%_ if (applicationType === 'monolith' || applicationType === 'gateway') { _%>
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
        this.userRepository = userRepository;
        this.userSearchRepository = userSearchRepository;
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

    @Async
    @Timed
    public void reindexAll() {
        <%_ if (!applicationType || applicationType === 'monolith' || applicationType === 'microservice') {
                entityFiles.forEach(function (file) {
                    var entity = file.split('.json')[0];
                    var entityLowerCase = entity.charAt(0).toLowerCase() + entity.slice(1); _%>
        reindexForClass(<%=entity%>.class, <%=entityLowerCase%>Repository, <%=entityLowerCase%>SearchRepository);
        <%_     });
            }
            if (!applicationType || applicationType === 'monolith' || applicationType === 'gateway') { _%>
        reindexForClass(User.class, userRepository, userSearchRepository);
        <%_ } _%>

        log.info("Elasticsearch: Successfully performed reindexing");
    }

    @Transactional(readOnly = true)
    @SuppressWarnings("unchecked")
    private <T> void reindexForClass(Class<T> entityClass, JpaRepository<T, Long> jpaRepository,
                                                          ElasticsearchRepository<T, Long> elasticsearchRepository) {
        elasticsearchTemplate.deleteIndex(entityClass);
        try {
            elasticsearchTemplate.createIndex(entityClass);
        } catch (IndexAlreadyExistsException e) {
            // Do nothing. Index was already concurrently recreated by some other service.
        }
        elasticsearchTemplate.putMapping(entityClass);
        if (jpaRepository.count() > 0) {
            try {
                Method m = jpaRepository.getClass().getMethod("findAllWithEagerRelationships");
                elasticsearchRepository.save((List<T>) m.invoke(jpaRepository));
            } catch (Exception e) {
                elasticsearchRepository.save(jpaRepository.findAll());
            }
        }
        log.info("Elasticsearch: Indexed all rows for " + entityClass.getSimpleName());
    }
}
