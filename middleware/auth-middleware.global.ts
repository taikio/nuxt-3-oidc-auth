import { User } from 'oidc-client-ts'
import { ISettings } from '@/services/types'
import { useAuth } from '@/stores/auth'
import WebStorageService from '@/services/web-storage-service'

const authFlowRoutes = ['/auth', '/silent-refresh', '/logout']

export default defineNuxtRouteMiddleware(async (to, _from) => {
	const config = useRuntimeConfig()
	const apiKey = config.public.apiKey
	const authStore = useAuth()
	const webStorageService = new WebStorageService()

	if (!webStorageService.getItem('oidc_config')) {
		const headers = { authorization: apiKey }
		const environment = await $fetch<ISettings>('/api/settings', {
			method: 'get',
			headers
		})
		// TODO: need to implement encryption
		webStorageService.setItem('oidc_config', JSON.stringify(environment))
	}

	const services = useServices()
	const user = (await services.$auth.getUser()) as User

	if (!user && !authFlowRoutes.includes(to.path)) {
		services.$auth.signInRedirect(to.path)
	} else {
		authStore.setUpUserCredentials(user)
	}
})
