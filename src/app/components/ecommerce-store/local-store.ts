export class LocalStore {

    constructor() { }

    setData(localdata:any) {
        localStorage.setItem('localdata', JSON.stringify(localdata));
    }

    getData(x:any) {
       localStorage.getItem('localdata');
       return JSON.parse(x);

    }

    clearStorage() {
        localStorage.clear();
    }
}