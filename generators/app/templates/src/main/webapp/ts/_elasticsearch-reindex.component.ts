import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
<%_ if (enableTranslation && requiresSetLocation) { _%>
import { JhiLanguageService } from 'ng-jhipster';
<%_ } _%>

import { ElasticsearchReindexModalComponent } from './elasticsearch-reindex-modal.component';
import { ElasticsearchReindexSelectedModalComponent } from './elasticsearch-reindex-selected-modal.component';

@Component({
    selector: 'jhi-elasticsearch-reindex',
    templateUrl: './elasticsearch-reindex.component.html'
})
export class ElasticsearchReindexComponent {

    entities: string[];
    reindexType: string;
    checks: { [key: string]: boolean } = {};

    constructor(
        <%_ if (enableTranslation && requiresSetLocation) { _%>
        private jhiLanguageService: JhiLanguageService,
        <%_ } _%>
        private modalService: NgbModal
    ) {
      <%_ if (enableTranslation && requiresSetLocation) { %>
        this.jhiLanguageService.setLocations(['elasticsearch-reindex']);
      <%_ } _%>
        this.reindexType = 'all';
        this.entities = [
    <%_ if (applicationType === 'monolith' || applicationType === 'microservice') {
            entityFiles.forEach(function (file) {
                var entity = file.split('.json')[0]; _%>
                '<%=entity%>',
    <%_     });
        } 
    _%>          
                'User'
        ];        
    }

    doReindex() {
        if (this.reindexType === 'all') {
            this.showConfirm();
        } else {
            this.showConfirmSelected();
        }
    }

    showConfirm() {
        this.modalService.open(ElasticsearchReindexModalComponent);
    }

    showConfirmSelected() {
        const activeModal = this.modalService.open(ElasticsearchReindexSelectedModalComponent);
        const checks = this.checks;
        const reindexList = this.entities.filter(function(name) {
            return checks[name];
        });
        activeModal.componentInstance.entities = reindexList;
    }

}
