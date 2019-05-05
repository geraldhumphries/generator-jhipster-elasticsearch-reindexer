package <%=packageName%>.web.rest;

import com.codahale.metrics.annotation.Timed;
import <%=packageName%>.security.AuthoritiesConstants;
import <%=packageName%>.security.SecurityUtils;
import <%=packageName%>.service.ElasticsearchIndexService;
<%_ if (jhipsterMajorVersion >= 6) { _%>
import io.github.jhipster.web.util.HeaderUtil;
import org.springframework.beans.factory.annotation.Value;
<%_ } else { _%>
import <%=packageName%>.web.rest.util.HeaderUtil;
<%_ } _%>
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
<%_ if (!usePostMapping) { _%>
import org.springframework.http.MediaType;
<%_ } _%>
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
<%_ if (usePostMapping) { _%>
import org.springframework.web.bind.annotation.PostMapping;
<%_ } _%>
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
<%_ if (!usePostMapping) { _%>
import org.springframework.web.bind.annotation.RequestMethod;
<%_ } _%>
import org.springframework.web.bind.annotation.RestController;

<%_ if (jhipsterMajorVersion < 4) { _%>
import javax.inject.Inject;
<%_ } _%>
import java.net.URISyntaxException;
import java.util.List;

/**
 * REST controller for managing Elasticsearch index.
 */
@RestController
@RequestMapping("/api")
public class ElasticsearchIndexResource {

    private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexResource.class);

    <%_ if (jhipsterMajorVersion >= 4) { _%>
    private final ElasticsearchIndexService elasticsearchIndexService;

    public ElasticsearchIndexResource(ElasticsearchIndexService elasticsearchIndexService) {
        this.elasticsearchIndexService = elasticsearchIndexService;
    }
    <%_ } else { _%>
    @Inject
    private ElasticsearchIndexService elasticsearchIndexService;
    <%_ } _%>

    <%_ if (jhipsterMajorVersion >= 6) { _%>
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    <%_ } _%>
    /**
     * POST  /elasticsearch/index -> Reindex all Elasticsearch documents
     */
    <%_ if (usePostMapping) { _%>
    @PostMapping("/elasticsearch/index")
    <%_ } else { _%>
    @RequestMapping(value = "/elasticsearch/index",
        method = RequestMethod.POST,
        produces = MediaType.TEXT_PLAIN_VALUE)
    <%_ } _%>
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> reindexAll() throws URISyntaxException {
        log.info("REST request to reindex Elasticsearch by user : {}, all entities", SecurityUtils.getCurrentUserLogin());
        elasticsearchIndexService.reindexSelected(null, true);
        return ResponseEntity.accepted()
            <%_ if (jhipsterMajorVersion >= 6) { _%>
            .headers(HeaderUtil.createAlert(applicationName, "elasticsearch.reindex.accepted", ""))
            <%_ } else { _%>
            .headers(HeaderUtil.createAlert("elasticsearch.reindex.accepted", ""))
            <%_ } _%>
            .build();
    }

    /**
     * POST  /elasticsearch/selected -> Reindex selected Elasticsearch documents
     */
    <%_ if (usePostMapping) { _%>
    @PostMapping("/elasticsearch/selected")
    <%_ } else { _%>
    @RequestMapping(value = "/elasticsearch/selected",
        method = RequestMethod.POST,
        produces = MediaType.TEXT_PLAIN_VALUE)
    <%_ } _%>
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> reindexSelected(@RequestBody List<String> selectedEntities) throws URISyntaxException {
        log.info("REST request to reindex Elasticsearch by user : {}, entities: {}", SecurityUtils.getCurrentUserLogin(), selectedEntities);
        elasticsearchIndexService.reindexSelected(selectedEntities, false);
        return ResponseEntity.accepted()
            <%_ if (jhipsterMajorVersion >= 6) { _%>
            .headers(HeaderUtil.createAlert(applicationName, "elasticsearch.reindex.acceptedSelected", ""))
            <%_ } else { _%>
            .headers(HeaderUtil.createAlert("elasticsearch.reindex.acceptedSelected", ""))
            <%_ } _%>
            .build();
    }

}
