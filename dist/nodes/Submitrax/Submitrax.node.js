"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Submitrax = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class Submitrax {
    constructor() {
        this.description = {
            displayName: 'SubmitraX',
            name: 'submitrax',
            icon: 'file:submitrax.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Consume SubmitraX API',
            defaults: {
                name: 'SubmitraX',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'submitraxApi',
                    required: true,
                },
            ],
            requestDefaults: {
                baseURL: 'https://s.submitrax.com',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Export',
                            value: 'export',
                        },
                        {
                            name: 'Form',
                            value: 'form',
                        },
                        {
                            name: 'Member',
                            value: 'member',
                        },
                        {
                            name: 'Submission',
                            value: 'submission',
                        },
                        {
                            name: 'Workspace',
                            value: 'workspace',
                        },
                    ],
                    default: 'workspace',
                },
                // Workspace Operations
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['workspace'],
                        },
                    },
                    options: [
                        {
                            name: 'Create',
                            value: 'create',
                            description: 'Create a new workspace',
                            action: 'Create a workspace',
                        },
                        {
                            name: 'Get Many',
                            value: 'getAll',
                            description: 'Get a list of many workspaces',
                            action: 'Get many workspaces',
                        },
                    ],
                    default: 'getAll',
                },
                // Member Operations
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['member'],
                        },
                    },
                    options: [
                        {
                            name: 'Get Many',
                            value: 'getAll',
                            description: 'Get a list of many members in a workspace',
                            action: 'Get many members',
                        },
                        {
                            name: 'Invite',
                            value: 'invite',
                            description: 'Invite a new user to the workspace',
                            action: 'Invite a member',
                        },
                    ],
                    default: 'getAll',
                },
                // Form Operations
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['form'],
                        },
                    },
                    options: [
                        {
                            name: 'Create',
                            value: 'create',
                            description: 'Create a new form',
                            action: 'Create a form',
                        },
                        {
                            name: 'Get',
                            value: 'get',
                            description: 'Get details of a specific form',
                            action: 'Get a form',
                        },
                        {
                            name: 'Get Many',
                            value: 'getAll',
                            description: 'Get many forms across',
                            action: 'Get many forms',
                        },
                    ],
                    default: 'getAll',
                },
                // Submission Operations
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['submission'],
                        },
                    },
                    options: [
                        {
                            name: 'Create',
                            value: 'create',
                            description: 'Create a new submission for a specific form',
                            action: 'Create a submission',
                        },
                        {
                            name: 'Get Many',
                            value: 'getAll',
                            description: 'Get many submissions for a specific form',
                            action: 'Get many submissions',
                        },
                    ],
                    default: 'getAll',
                },
                // Export Operations
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['export'],
                        },
                    },
                    options: [
                        {
                            name: 'Create',
                            value: 'create',
                            description: 'Generate exports for your submission data via API',
                            action: 'Create an export',
                        },
                    ],
                    default: 'create',
                },
                // ----------------------------------
                // Workspace Fields
                // ----------------------------------
                {
                    displayName: 'Name',
                    name: 'name',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['workspace'],
                            operation: ['create'],
                        },
                    },
                    default: '',
                    description: 'The name of the workspace',
                },
                // ----------------------------------
                // Member Fields
                // ----------------------------------
                {
                    displayName: 'Workspace ID',
                    name: 'workspaceId',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['member'],
                            operation: ['getAll', 'invite'],
                        },
                    },
                    default: '',
                },
                {
                    displayName: 'Their Name',
                    name: 'theirName',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['member'],
                            operation: ['invite'],
                        },
                    },
                    default: '',
                    description: 'Name of the invitee',
                },
                {
                    displayName: 'Their Email',
                    name: 'theirEmail',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['member'],
                            operation: ['invite'],
                        },
                    },
                    default: '',
                    description: 'Email of the invitee',
                },
                {
                    displayName: 'Your Name',
                    name: 'yourName',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['member'],
                            operation: ['invite'],
                        },
                    },
                    default: '',
                    description: 'Your name (to display in email)',
                },
                // ----------------------------------
                // Form Fields
                // ----------------------------------
                {
                    displayName: 'Form ID',
                    name: 'formId',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['form'],
                            operation: ['get'],
                        },
                    },
                    default: '',
                },
                {
                    displayName: 'Name',
                    name: 'name',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['form'],
                            operation: ['create'],
                        },
                    },
                    default: '',
                    description: 'Form name',
                },
                {
                    displayName: 'Workspace ID',
                    name: 'workspaceId',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['form'],
                            operation: ['create'],
                        },
                    },
                    default: '',
                    description: 'ID of the workspace',
                },
                {
                    displayName: 'Additional Fields',
                    name: 'additionalFields',
                    type: 'collection',
                    placeholder: 'Add Field',
                    default: {},
                    displayOptions: {
                        show: {
                            resource: ['form'],
                            operation: ['create'],
                        },
                    },
                    options: [
                        {
                            displayName: 'Email To',
                            name: 'email_to',
                            type: 'string',
                            default: '',
                            description: 'Comma-separated emails',
                        },
                    ],
                },
                // ----------------------------------
                // Submission Fields
                // ----------------------------------
                {
                    displayName: 'Form ID',
                    name: 'formId',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['submission'],
                            operation: ['getAll', 'create'],
                        },
                    },
                    default: '',
                },
                {
                    displayName: 'Data (JSON)',
                    name: 'dataJson',
                    type: 'json',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['submission'],
                            operation: ['create'],
                        },
                    },
                    default: '{}',
                    description: 'The JSON payload for the submission',
                },
                // ----------------------------------
                // Export Fields
                // ----------------------------------
                {
                    displayName: 'Form ID',
                    name: 'formId',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['export'],
                            operation: ['create'],
                        },
                    },
                    default: '',
                },
                {
                    displayName: 'Format',
                    name: 'format',
                    type: 'options',
                    options: [
                        { name: 'CSV', value: 'csv' },
                        { name: 'JSON', value: 'json' },
                    ],
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['export'],
                            operation: ['create'],
                        },
                    },
                    default: 'csv',
                },
                {
                    displayName: 'Additional Fields',
                    name: 'additionalFields',
                    type: 'collection',
                    placeholder: 'Add Field',
                    default: {},
                    displayOptions: {
                        show: {
                            resource: ['export'],
                            operation: ['create'],
                        },
                    },
                    options: [
                        {
                            displayName: 'Start Date',
                            name: 'start_date',
                            type: 'dateTime',
                            default: '',
                        },
                        {
                            displayName: 'End Date',
                            name: 'end_date',
                            type: 'dateTime',
                            default: '',
                        },
                    ],
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        for (let i = 0; i < items.length; i++) {
            try {
                let responseData;
                if (resource === 'workspace') {
                    if (operation === 'getAll') {
                        const options = {
                            method: 'GET',
                            url: '/workspaces',
                            json: true,
                        };
                        responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'submitraxApi', options);
                    }
                    if (operation === 'create') {
                        const name = this.getNodeParameter('name', i);
                        const options = {
                            method: 'POST',
                            url: '/workspaces',
                            body: { name },
                            json: true,
                        };
                        responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'submitraxApi', options);
                    }
                }
                else if (resource === 'member') {
                    if (operation === 'getAll') {
                        const workspaceId = this.getNodeParameter('workspaceId', i);
                        const options = {
                            method: 'GET',
                            url: `/members/${workspaceId}/members`,
                            json: true,
                        };
                        responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'submitraxApi', options);
                    }
                    if (operation === 'invite') {
                        const workspaceId = this.getNodeParameter('workspaceId', i);
                        const theirName = this.getNodeParameter('theirName', i);
                        const theirEmail = this.getNodeParameter('theirEmail', i);
                        const yourName = this.getNodeParameter('yourName', i);
                        const options = {
                            method: 'POST',
                            url: `/members/${workspaceId}/members/invite`,
                            body: { theirName, theirEmail, yourName },
                            json: true,
                        };
                        responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'submitraxApi', options);
                    }
                }
                else if (resource === 'form') {
                    if (operation === 'getAll') {
                        const options = {
                            method: 'GET',
                            url: '/forms',
                            json: true,
                        };
                        responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'submitraxApi', options);
                    }
                    if (operation === 'get') {
                        const formId = this.getNodeParameter('formId', i);
                        const options = {
                            method: 'GET',
                            url: `/forms/${formId}`,
                            json: true,
                        };
                        responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'submitraxApi', options);
                    }
                    if (operation === 'create') {
                        const name = this.getNodeParameter('name', i);
                        const workspaceId = this.getNodeParameter('workspaceId', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const body = { name, workspace_id: workspaceId };
                        if (additionalFields.email_to) {
                            body.email_to = additionalFields.email_to;
                        }
                        const options = {
                            method: 'POST',
                            url: '/forms',
                            body,
                            json: true,
                        };
                        responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'submitraxApi', options);
                    }
                }
                else if (resource === 'submission') {
                    if (operation === 'getAll') {
                        const formId = this.getNodeParameter('formId', i);
                        const options = {
                            method: 'GET',
                            url: `/submissions/form/${formId}`,
                            json: true,
                        };
                        responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'submitraxApi', options);
                    }
                    if (operation === 'create') {
                        const formId = this.getNodeParameter('formId', i);
                        const dataJson = this.getNodeParameter('dataJson', i);
                        let body = {};
                        try {
                            body = JSON.parse(dataJson);
                        }
                        catch (error) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Invalid JSON provided for submission data');
                        }
                        const options = {
                            method: 'POST',
                            url: `/submissions/form/${formId}`,
                            body,
                            json: true,
                        };
                        responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'submitraxApi', options);
                    }
                }
                else if (resource === 'export') {
                    if (operation === 'create') {
                        const formId = this.getNodeParameter('formId', i);
                        const format = this.getNodeParameter('format', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const body = { format };
                        if (additionalFields.start_date) {
                            body.start_date = additionalFields.start_date.split('T')[0]; // Format to YYYY-MM-DD based on typical datetime component
                        }
                        if (additionalFields.end_date) {
                            body.end_date = additionalFields.end_date.split('T')[0];
                        }
                        const options = {
                            method: 'POST',
                            url: `/exports/form/${formId}`,
                            body,
                            json: true,
                        };
                        responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'submitraxApi', options);
                    }
                }
                if (Array.isArray(responseData)) {
                    returnData.push(...this.helpers.returnJsonArray(responseData));
                }
                else if (responseData !== undefined) {
                    returnData.push(this.helpers.returnJsonArray([responseData])[0]);
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
                    returnData.push({ json: { error: errorMsg } });
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
exports.Submitrax = Submitrax;
