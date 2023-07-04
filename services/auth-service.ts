import { User, UserManager, WebStorageStateStore } from 'oidc-client-ts'
import WebStorageService from '@/services/web-storage-service'

export default class AuthService {
	private userManager!: UserManager
	private webStorageService!: WebStorageService

	constructor() {
		this.webStorageService = new WebStorageService()
		this.initalizeOIDC()
	}

	private initalizeOIDC() {
		try {
			const storedConfig = this.webStorageService.getItem('oidc_config')
			const environment = JSON.parse(storedConfig)
			
			const settings = {
				authority: environment.authorityUrl,
				client_id: environment.clientId,
				redirect_uri: `${window.location.origin}/auth`,
				silent_redirect_uri: `${window.location.origin}/silent-refresh`,
				post_logout_redirect_uri: `${window.location.origin}`,
				response_type: 'code',
				scope: environment.clientScope,
				userStore: new WebStorageStateStore(),
				loadUserInfo: true
			}
			this.userManager = new UserManager(settings)
		} catch (error) {}
	}

	public signInRedirect(requestedUrl = '/') {
		this.webStorageService.setItem('oidc_requested_url', requestedUrl)
		return this.userManager.signinRedirect()
	}

	public signInCallback() {
		return this.userManager.signinCallback()
	}

	public renewToken(): Promise<void> {
		return this.userManager.signinSilentCallback()
	}

	public logout(): Promise<void> {
		return this.userManager.signoutRedirect()
	}

	public getUser(): Promise<User | null> {
		return this.userManager.getUser()
	}
}
