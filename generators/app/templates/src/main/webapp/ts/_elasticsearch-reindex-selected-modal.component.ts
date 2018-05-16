import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ElasticsearchReindexService } from './elasticsearch-reindex.service';

@Component({
    selector: 'jhi-elasticsearch-reindex-modal',
    templateUrl: './elasticsearch-reindex-modal.component.html'
})
export class ElasticsearchReindexSelectedModalComponent {

    entities: string[];
    constructor(
        private elasticsearchReindexService: ElasticsearchReindexService,
        public activeModal: NgbActiveModal
    ) { }

    reindex() {
        this.elasticsearchReindexService.reindexSelected(this.entities).subscribe(() => this.activeModal.dismiss());
    }
}
