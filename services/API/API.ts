export class API {
    constructor(private service: string = location.origin) { }

    GET(action: string) {
        return this.baseRequest(action, {
            method: 'GET'
        });
    }
    POST(action: string) {
        return this.baseRequest(action, {
            method: 'POST'
        });
    }
    PUT(action: string) {
        return this.baseRequest(action, {
            method: 'PUT'
        });
    }
    PATCH(action: string) {
        return this.baseRequest(action, {
            method: 'PATCH'
        });
    }
    DELETE(action: string) {
        return this.baseRequest(action, {
            method: 'DELETE'
        });
    }

    private baseRequest(action: string, init: RequestInit) {
        return fetch(`${this.service}/${action}`, init);
    }
}