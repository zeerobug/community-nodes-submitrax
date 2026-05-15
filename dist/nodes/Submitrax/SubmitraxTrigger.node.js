"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitraxTrigger = void 0;
class SubmitraxTrigger {
    constructor() {
        this.description = {
            displayName: 'SubmitraX Trigger',
            name: 'submitraxTrigger',
            icon: 'file:submitrax.svg',
            group: ['trigger'],
            version: 1,
            description: 'Handle SubmitraX webhooks',
            defaults: {
                name: 'SubmitraX Trigger',
            },
            inputs: [],
            outputs: ['main'],
            credentials: [
                {
                    name: 'submitraxApi',
                    required: true,
                },
            ],
            webhooks: [
                {
                    name: 'default',
                    httpMethod: 'POST',
                    responseMode: 'onReceived',
                    path: 'webhook',
                },
            ],
            properties: [
                {
                    displayName: 'Form ID',
                    name: 'formId',
                    type: 'string',
                    required: true,
                    default: '',
                    description: 'The ID of the form to trigger on',
                },
            ],
        };
        this.webhookMethods = {
            default: {
                async checkExists() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const formId = this.getNodeParameter('formId');
                    const options = {
                        method: 'GET',
                        url: `https://s.submitrax.com/api/forms/${formId}`,
                        json: true,
                    };
                    try {
                        const responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'submitraxApi', options);
                        if (responseData.settings && responseData.settings.webhooks) {
                            for (const webhook of responseData.settings.webhooks) {
                                if (webhook.url === webhookUrl) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }
                    catch (error) {
                        return false;
                    }
                },
                async create() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const formId = this.getNodeParameter('formId');
                    const options = {
                        method: 'POST',
                        url: `https://s.submitrax.com/api/forms/${formId}/webhooks`,
                        body: {
                            url: webhookUrl,
                        },
                        json: true,
                    };
                    await this.helpers.httpRequestWithAuthentication.call(this, 'submitraxApi', options);
                    return true;
                },
                async delete() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const formId = this.getNodeParameter('formId');
                    const options = {
                        method: 'DELETE',
                        url: `https://s.submitrax.com/api/forms/${formId}/webhooks`,
                        body: {
                            url: webhookUrl,
                        },
                        json: true,
                    };
                    try {
                        await this.helpers.httpRequestWithAuthentication.call(this, 'submitraxApi', options);
                        return true;
                    }
                    catch (error) {
                        return false;
                    }
                },
            },
        };
    }
    async webhook() {
        const body = this.getBodyData();
        return {
            workflowData: [
                this.helpers.returnJsonArray(body),
            ],
        };
    }
}
exports.SubmitraxTrigger = SubmitraxTrigger;
