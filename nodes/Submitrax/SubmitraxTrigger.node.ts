import {
	IHookFunctions,
	IHttpRequestOptions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';

export class SubmitraxTrigger implements INodeType {
	description: INodeTypeDescription = {
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

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const formId = this.getNodeParameter('formId') as string;

				const options: IHttpRequestOptions = {
					method: 'GET',
					url: `https://s.submitrax.com/api/forms/${formId}`,
					json: true,
				};

				try {
					const responseData = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'submitraxApi',
						options,
					);

					if (responseData.settings && responseData.settings.webhooks) {
						for (const webhook of responseData.settings.webhooks) {
							if (webhook.url === webhookUrl) {
								return true;
							}
						}
					}
					return false;
				} catch (error) {
					return false;
				}
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const formId = this.getNodeParameter('formId') as string;

				const options: IHttpRequestOptions = {
					method: 'POST',
					url: `https://s.submitrax.com/api/forms/${formId}/webhooks`,
					body: {
						url: webhookUrl,
					},
					json: true,
				};

				await this.helpers.httpRequestWithAuthentication.call(
					this,
					'submitraxApi',
					options,
				);

				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const formId = this.getNodeParameter('formId') as string;

				const options: IHttpRequestOptions = {
					method: 'DELETE',
					url: `https://s.submitrax.com/api/forms/${formId}/webhooks`,
					body: {
						url: webhookUrl,
					},
					json: true,
				};

				try {
					await this.helpers.httpRequestWithAuthentication.call(
						this,
						'submitraxApi',
						options,
					);
					return true;
				} catch (error) {
					return false;
				}
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData();

		return {
			workflowData: [
				this.helpers.returnJsonArray(body),
			],
		};
	}
}
