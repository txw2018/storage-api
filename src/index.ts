const isString = （value） => typeof value === 'string'
const STORAGE = window.localStorage
const SESSION = window.sessionStorage
function serialize(value) {
  return JSON.stringify(value)
}

function deserialize(value) {
  if (!isString(value)) {
    return undefined
  }
  try {
    return JSON.parse(value)
  } catch (error) {
    return value || undefined
  }
}

function createStorage(STORAGE) {
  return {
    set(key, value) {
      STORAGE.setItem(key, serialize(value))
    },
    get(key, defaultValue) {
      const value = deserialize(STORAGE.getItem(key))
      return value === undefined ? defaultValue : value
    },
    remove(key) {
      STORAGE.removeItem(key)
    }
  }
}
export const storage = createStorage(STORAGE)

export const session = createStorage(SESSION)
