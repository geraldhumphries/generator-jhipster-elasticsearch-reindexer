import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
<%_ if (enableTranslation) { _%>
import { JhiLanguageService } from 'ng-jhipster';
<%_ } _%>

import { ElasticsearchReindexService } from './elasticsearch-reindex.service';
import { ElasticsearchReindexModalComponent } from './elasticsearch-reindex-modal.component';

@Component({
    selector: 'jhi-elasticsearch-reindex',
    templateUrl: './elasticsearch-reindex.component.html'
})
export class ElasticsearchReindexComponent {

    constructor(
        <%_ if (enableTranslation) { _%>
        private jhiLanguageService: JhiLanguageService,
        <%_ } _%>
        private modalService: NgbModal,
        private elasticsearchReindexService: ElasticsearchReindexService
    ) {
        <%_ if (enableTranslation) { _%>
        this.jhiLanguageService.setLocations(['elasticsearch-reindex']);
        <%_ } _%>
    }

    showConfirm() {
        const modalRef = this.modalService.open(ElasticsearchReindexModalComponent);
        modalRef.result.then((result) => {
            // Left blank intentionally, nothing to do here
        }, (reason) => {
            // Left blank intentionally, nothing to do here
        });
    }
}
