import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class PostService {
    public url: string;
    public identity;
    public token;

    constructor(
        public _http: HttpClient
    ) {
        this.url = global.url;
    }

    create(token, post): Observable<any> {
        let json = JSON.stringify(post);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + 'post', params, { headers: headers });
    }

    getAll(token): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.get(this.url + 'post', { headers: headers });
    }

    getOne(id, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.get(this.url + 'post/' + id, { headers: headers });
    }

    getPostByCategory(category_id): Observable<any>{
        return this._http.get(this.url + 'post/category/' + category_id);
    }

    update(token, post, id): Observable<any>{
        let json = JSON.stringify(post);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.put(this.url+'post/'+id, params, { headers: headers });
    }

    delete(id, token){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.delete(this.url+'post/'+id, { headers: headers });
    }
}