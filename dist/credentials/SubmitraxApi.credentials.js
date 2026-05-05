"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitraxApi = void 0;
class SubmitraxApi {
    constructor() {
        this.name = 'submitraxApi';
        this.displayName = 'SubmitraX API';
        this.documentationUrl = 'https://s.submitrax.com';
        this.properties = [
            {
                displayName: 'API Token',
                name: 'apiToken',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
            },
        ];
    }
}
exports.SubmitraxApi = SubmitraxApi;
