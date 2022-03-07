
export const LocalStorage = {
    set(key: string, value: any) {
        if (typeof value === 'string') {
            localStorage.setItem(key, JSON.stringify({
                _format: 'string',
                value
            }))
        }
        if (typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify({
                _format: 'object',
                value
            }))
        }
    },
    get(key: string): any {
        const val = localStorage.getItem(key)
        if (val === null) {
            return null
        }

        return JSON.parse(val).value
    },
    remove(key: string) {
        localStorage.removeItem(key)
    }
}

export const SessionStorage = {
    set(key: string, value: any) {
        if (typeof value === 'string') {
            sessionStorage.setItem(key, JSON.stringify({
                _format: 'string',
                value
            }))
        }
        if (typeof value === 'object') {
            sessionStorage.setItem(key, JSON.stringify({
                _format: 'object',
                value
            }))
        }
    },
    get(key: string) {
        const val: any = sessionStorage.getItem(key)
        if (val === null) {
            return null
        }
        return JSON.parse(val).value
    },
    removeItem(key: string) {
        sessionStorage.removeItem(key)
    }
}