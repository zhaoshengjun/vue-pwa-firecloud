import idbKeyval from 'idb-keyval'

export const save = (id, message) => {
  return idbKeyval.set(id, message)
}

export const get = id => {
  idbKeyval.get(id)
}
