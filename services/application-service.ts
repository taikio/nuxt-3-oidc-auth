import WebStorageService from '@/services/web-storage-service'

export default class ApplicationService {
	private applicationUrl: string = ''
	private basePath = '/'
	private webStorageService!: WebStorageService

	constructor(private readonly acessToken: string, private readonly tenantId: string) {
		this.webStorageService = new WebStorageService()
		const environment = this.webStorageService.getItem('oidc_config')
		this.applicationUrl = environment.applicationUrl
	}

	private getDefaultHeader() {
		return {
			Authorization: `Bearer ${this.acessToken}`,
			Tenant: this.tenantId
		}
	}

	async getApiData() {
		const headers = this.getDefaultHeader()

		const result = await $fetch(`${this.applicationUrl}${this.basePath}/v1/Posts`, {
			method: 'get',
			headers,
			query: { page: 1, size: 10 }
		})

		return result
	}
}
