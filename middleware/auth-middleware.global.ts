import { User } from 'oidc-client-ts'
import { ISettings } from '@/services/types'
import { useAuth } from '@/stores/auth'

const authFlowRoutes = ['/auth', '/silent-refresh', '/logout']

export default defineNuxtRouteMiddleware(async (to, _from) => {
	const apiKey = 'c7d429c1-0a07-484b-ad8f-941df0634972'
	const authStore = useAuth()

	if (!window.localStorage.getItem('oidc_config')) {
		const headers = { authorization: apiKey }
		const environment = await $fetch<ISettings>('/api/settings', {
			method: 'get',
			headers
		})
		// TODO: need to implement encryption
		window.localStorage.setItem('oidc_config', JSON.stringify(environment))
	}

	const services = useServices()
	const user = (await services.$auth.getUser()) as User

	if (!user && !authFlowRoutes.includes(to.path)) {
		services.$auth.signInRedirect(to.path)
	} else {
		authStore.setUpUserCredentials(user)
	}
})
