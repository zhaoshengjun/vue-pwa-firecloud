import { get, set } from 'idb-keyval'

export const localSave = (id, messages) => set(id, messages)

export const localGet = id => get(id)
