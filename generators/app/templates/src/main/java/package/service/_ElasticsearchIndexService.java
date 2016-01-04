package <%=packageName%>.service;

import com.codahale.metrics.annotation.Timed;
import <%=packageName%>.domain.*;
import <%=packageName%>.repository.*;
import <%=packageName%>.repository.search.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;

@Service
@Transactional
public class ElasticsearchIndexService {

    private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexService.class);

    <%_ entityFiles.forEach(function (file) {
        var entity = file.split('.json')[0];
        var entityLowerCase = entity.charAt(0).toLowerCase() + entity.slice(1); _%>
    @Inject
    private <%=entity%>Repository <%=entityLowerCase%>Repository;

    @Inject
    private <%=entity%>SearchRepository <%=entityLowerCase%>SearchRepository;

    <%_ }); _%>
    @Inject
    private UserRepository userRepository;

    @Inject
    private UserSearchRepository userSearchRepository;

    @Inject
    private ElasticsearchTemplate elasticsearchTemplate;

    @Async
    @Timed
    public void reindexAll() {
        <%_ entityFiles.forEach(function (file) {
            var entity = file.split('.json')[0];
            var entityLowerCase = entity.charAt(0).toLowerCase() + entity.slice(1); _%>
        elasticsearchTemplate.deleteIndex(<%=entity%>.class);
        if (<%=entityLowerCase%>Repository.count() > 0) {
            <%=entityLowerCase%>SearchRepository.save(<%=entityLowerCase%>Repository.findAll());
        }
        log.info("Elasticsearch: Indexed all <%=entityLowerCase%>s");

        <%_ }); _%>
        elasticsearchTemplate.deleteIndex(User.class);
        if (userRepository.count() > 0) {
            userSearchRepository.save(userRepository.findAll());
        }
        log.info("Elasticsearch: Indexed all users");

        log.info("Elasticsearch: Successfully performed reindexing");
    }
}
