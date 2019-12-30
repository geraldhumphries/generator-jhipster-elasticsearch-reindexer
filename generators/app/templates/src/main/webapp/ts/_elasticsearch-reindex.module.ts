import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

<%_ if (useAbsoluteTsImports) { _%>
import { <%=angularXAppName%>SharedModule } from 'app/shared';
<%_ } else {_%>
import { <%=angularXAppName%>SharedModule } from '../../shared';
<%_ } %>

import {
    ElasticsearchReindexComponent,
    ElasticsearchReindexModalComponent,
    ElasticsearchReindexService,
    elasticsearchReindexRoute
} from './';

const ADMIN_ROUTES = [
    elasticsearchReindexRoute
];

@NgModule({
    imports: [
        <%=angularXAppName%>SharedModule,
        RouterModule.forChild(ADMIN_ROUTES)
    ],
    declarations: [
        ElasticsearchReindexComponent,
        ElasticsearchReindexModalComponent
    ],
    entryComponents: [
        ElasticsearchReindexModalComponent
    ],
    providers: [
        ElasticsearchReindexService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class <%=angularXAppName%>ElasticsearchReindexModule {}
