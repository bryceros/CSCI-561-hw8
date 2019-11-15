import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

export interface Cat {
    name: string
    }

@Injectable({
    providedIn: 'root'
  })

export class CatService {
    constructor(private http: HttpClient) {}
    //addr = "http://localhost:3000";
    addr = '';
    getAllCats(): Observable<Cat[]> {
        return this.http.get<Cat[]>(this.addr+'/api/cats')
    }

    getCat(name: string): Observable<string[]> {
        return this.http.get<string[]>(this.addr+'/api/cats:' + name)
    }

    sendMainForm(cat) {
        return this.http.post(this.addr+'/api/cats/', cat)
    }
    sendMainForm_CL(cat){
        return this.http.post(this.addr+'/api/cats/cl', cat)
    }
    sendTimeForm(cat) {
        return this.http.post(this.addr+'/api/cats/time/', cat)
    }

    sendLocation(){
        return this.http.post('http://ip-api.com/json',null)
    }

}