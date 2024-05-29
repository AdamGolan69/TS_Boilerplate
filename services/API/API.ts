export class API {
    constructor(private service: string = location.origin) { }

    GET(action: string) {
        return this.baseRequest(action, this.createInit('GET', ''));
    }
    POST(action: string, payload: string) {
        return this.baseRequest(action, this.createInit('POST', payload));
    }
    PUT(action: string, payload: string) {
        return this.baseRequest(action, this.createInit('PUT', payload));
    }
    PATCH(action: string, payload: string) {
        return this.baseRequest(action, this.createInit('PATCH', payload));
    }
    DELETE(action: string, payload: string) {
        return this.baseRequest(action, this.createInit('DELETE', payload));
    }

    private createInit(method: keyof API, payload: string): RequestInit {
        return {
            headers: { 'Content-Type': 'application/json' },
            method,
            body: method === 'GET' ? null : payload
        }
    }

    private baseRequest(action: string, init: RequestInit): Promise<any> {
        return fetch(`${this.service}/${action}`, init).then(res => res.json());
    }
}