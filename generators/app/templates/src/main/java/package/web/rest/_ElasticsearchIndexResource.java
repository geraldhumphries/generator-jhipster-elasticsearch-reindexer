package <%=packageName%>.web.rest;

import com.codahale.metrics.annotation.Timed;
import <%=packageName%>.security.AuthoritiesConstants;
import <%=packageName%>.security.SecurityUtils;
import <%=packageName%>.service.ElasticsearchIndexService;
import <%=packageName%>.web.rest.util.HeaderUtil;
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
import org.springframework.web.bind.annotation.RequestMapping;
<%_ if (!usePostMapping) { _%>
import org.springframework.web.bind.annotation.RequestMethod;
<%_ } _%>
import org.springframework.web.bind.annotation.RestController;

<%_ if (jhipsterMajorVersion < 4) { _%>
import javax.inject.Inject;
<%_ } _%>
import java.net.URISyntaxException;

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
        log.info("REST request to reindex Elasticsearch by user : {}", SecurityUtils.getCurrentUserLogin());
        elasticsearchIndexService.reindexAll();
        return ResponseEntity.accepted()
            .headers(HeaderUtil.createAlert("elasticsearch.reindex.accepted", null))
            .build();
    }
}
