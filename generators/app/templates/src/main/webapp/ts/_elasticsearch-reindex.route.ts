import { Route } from '@angular/router';
<%_ if (useAbsoluteTsImports) { _%>
import { UserRouteAccessService } from 'app/core';
<%_ } else {_%>
import { UserRouteAccessService } from '../../shared';
<%_ } %>

import { ElasticsearchReindexComponent } from './elasticsearch-reindex.component';

export const elasticsearchReindexRoute: Route = {
    path: 'elasticsearch-reindex',
    component: ElasticsearchReindexComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: <% if (enableTranslation){ %>'elasticsearch.reindex.title'<% }else{ %>'Reindex Elasticsearch'<% } %>
    },
    canActivate: [UserRouteAccessService]
};
