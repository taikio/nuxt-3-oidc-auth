import { useAuth } from '@/stores/auth'
import AuthService from '@/services/auth-service'
import ApplicationService from '@/services/application-service'
import WebStorageService from '@/services/web-storage-service'

export const useServices = () => {
	const authStore = useAuth()

	return {
		$webStorage: new WebStorageService(),
		$auth: new AuthService(),
		$application: new ApplicationService(authStore.access_token, authStore.tenantId)
	}
}
