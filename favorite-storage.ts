import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// key that is used to access the data in local storageconst 
const STORAGE_KEY = 'local_todolist';
@Injectable()

export class LocalStorageService {
    anotherTodolist = [];     
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { } 
    public clear(){
        this.storage.clear();
    }    
    public storeOnLocalStorage(object: {}){
        
        // get array of tasks from local storage
        const currentTodoList = this.storage.get(STORAGE_KEY) || [];          // push new task to array
        currentTodoList.push(object);         
        // insert updated array to local storage
        this.storage.set(STORAGE_KEY, currentTodoList);          
        console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty'); 
        return this.storage.get(STORAGE_KEY);     
    }
    public getOnLocalStorageList() {
        // get array of tasks from local storage
        const currentTodoList = this.storage.get(STORAGE_KEY)  || [];
        return currentTodoList
    }
    private getOnLocalStorage(fav_info) {
        const currentTodoList = this.storage.get(STORAGE_KEY) || [];          // push new task to array
        for(let i = 0; i < currentTodoList.length; ++i){
            if(currentTodoList[i].city.toLowerCase() == fav_info.city.toLowerCase()
            && currentTodoList[i].state.toLowerCase() == fav_info.state.toLowerCase()){
                return i;
            }
        }
        return null;
    }
    public checkOnLocalStorage(fav_info): boolean {
        if (this.getOnLocalStorage(fav_info)!=null){
            return true;
        }
        return false;
    }
    public deleteOnLocalStorage(fav_info) {
        // get array of tasks from local storage
        const currentTodoList = this.storage.get(STORAGE_KEY) || [];          // push new task to array
        let index = this.getOnLocalStorage(fav_info)
        if(index != null){
            currentTodoList.splice(index, 1)
            this.storage.set(STORAGE_KEY, currentTodoList || []);      
        }
        return this.storage.get(STORAGE_KEY) || [];       
    }
}