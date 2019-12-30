import { Injectable } from '@angular/core';
<%_ if (useCommonHttpApi) { _%>
import { HttpClient, HttpResponse } from '@angular/common/http';
<%_ } else {_%>
import { Http, Response } from '@angular/http';
<%_ } %>
<%_ if (jhipsterMajorVersion > 4) { _%>
import { Observable } from 'rxjs';
<%_ } else { _%>
import { Observable } from 'rxjs/Rx';
<%_ } _%>

@Injectable({ providedIn: 'root' })
export class ElasticsearchReindexService {

    constructor(
<%_ if (useCommonHttpApi) { _%>
        private http: HttpClient
<%_ } else {_%>
        private http: Http
<%_ } %>
    ) { }

<%_ if (useCommonHttpApi) { _%>
    reindex(): Observable<HttpResponse<any>> {
        return this.http.post<any>('api/elasticsearch/index', {observe: 'response'});
    }
<%_ } else {_%>
    reindex(): Observable<Response> {
        return this.http.post('api/elasticsearch/index', {});
    }
<%_ } %>
<%_ if (useCommonHttpApi) { _%>
    reindexSelected(selectedEntities: string[]): Observable<HttpResponse<any>> {
        return this.http.post<any>('api/elasticsearch/selected', selectedEntities, {observe: 'response'});
    }
<%_ } else {_%>
    reindexSelected(selectedEntities: string[]): Observable<Response> {
        return this.http.post('api/elasticsearch/selected', selectedEntities, {});
    }
<%_ } %>
}
