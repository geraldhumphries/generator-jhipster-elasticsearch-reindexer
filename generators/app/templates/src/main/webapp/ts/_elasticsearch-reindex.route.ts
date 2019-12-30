import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../core';
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
