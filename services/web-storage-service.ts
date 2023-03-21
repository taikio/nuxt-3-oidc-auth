export type WebStorageKey = 'oidc_requested_url' | 'tenant_id_default' | 'oidc_config'

export default class WebStorageService {
	private _db: Storage

	constructor() {
		this._db = window.localStorage
	}

	setItem(key: WebStorageKey, content: any) {
		if (!content) {
			return
		}

		this._db.setItem(key, JSON.stringify(content).trimStart().trimEnd())
	}

	getItem(key: WebStorageKey) {
		const result = this._db.getItem(key)

		if (!result) {
			return ''
		}

		try {
			return JSON.parse(result)
		} catch (error) {
			return result
		}
	}

	removeItem(key: string) {
		this._db.removeItem(key)
	}

	clearStorage() {
		this._db.clear()
	}
}
