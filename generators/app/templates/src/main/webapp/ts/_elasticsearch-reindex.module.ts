import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { <%=angularXAppName%>SharedModule } from '../../shared';

import {
    ElasticsearchReindexComponent,
    ElasticsearchReindexModalComponent,
    ElasticsearchReindexSelectedModalComponent,
    ElasticsearchReindexService,
    elasticsearchReindexRoute
} from './';

const ADMIN_ROUTES = [
    elasticsearchReindexRoute
];

@NgModule({
    imports: [
        <%=angularXAppName%>SharedModule,
        <%_ if (jhipsterMajorVersion > 4) { _%>
            RouterModule.forChild(ADMIN_ROUTES)
        <%_ } else { _%>
        RouterModule.forRoot(ADMIN_ROUTES, { useHash: true })
        <%_ } _%>
    ],
    declarations: [
        ElasticsearchReindexComponent,
        ElasticsearchReindexModalComponent,
        ElasticsearchReindexSelectedModalComponent
    ],
    entryComponents: [
        ElasticsearchReindexModalComponent,
        ElasticsearchReindexSelectedModalComponent
    ],
    providers: [
        ElasticsearchReindexService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class <%=angularXAppName%>ElasticsearchReindexModule {}
