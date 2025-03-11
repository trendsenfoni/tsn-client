
function prepareHeaders(admintoken?: string) {
  return { 'Content-Type': 'application/json', admintoken: admintoken || '' }
}
export function getItem(path: string, admintoken?: string) {
  return new Promise<any>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
      method: 'GET',
      headers: prepareHeaders(admintoken)
    })
      .then(ret => ret.json())
      .then(result => {
        if (result.success) {
          resolve(result.data)
        } else {
          reject(result.error)
        }
      }).catch(err => reject(err.message || err || 'error'))
  })
}

export function getList(path: string, admintoken?: string) {
  return new Promise<any>((resolve, reject) => {

    fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
      method: 'GET',
      headers: prepareHeaders(admintoken)
    })
      .then(ret => ret.json())
      .then(result => {
        if (result.success) {
          resolve(result.data)
        } else {
          reject(result.error)
        }
      }).catch(err => reject(err.message || err || 'error'))
  })
}

export function putItem(path: string, admintoken?: string, item?: any) {
  return new Promise<any>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
      method: 'PUT',
      headers: prepareHeaders(admintoken),
      body: JSON.stringify(item)
    })
      .then(ret => ret.json())
      .then(result => {
        if (result.success) {
          resolve(result.data)
        } else {
          reject(result.error)
        }
      }).catch(err => reject(err.message || err || 'error'))
  })
}
export function postItem(path: string, admintoken?: string, item?: any) {
  return new Promise<any>((resolve, reject) => {
    console.log('postItem url:', `${process.env.NEXT_PUBLIC_API_URI}${path}`)
    fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
      method: 'POST',
      headers: prepareHeaders(admintoken),
      body: JSON.stringify(item)
    })
      .then(ret => ret.json())
      .then(result => {
        console.log('postItem result:', result)
        if (result.success) {
          resolve(result.data)
        } else {
          reject(result.error)
        }
      }).catch(err => reject(err.message || err || 'error'))
  })
}
export function deleteItem(path: string, admintoken?: string) {
  return new Promise<any>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
      method: 'DELETE',
      headers: prepareHeaders(admintoken)
    })
      .then(ret => ret.json())
      .then(result => {
        if (result.success) {
          resolve(result.data)
        } else {
          reject(result.error)
        }
      }).catch(err => reject(err.message || err || 'error'))
  })
}

export interface SearchParamProps {
  filter?: any
  sort?: any
  select?: any
  populate?: any
  limit?: number
}
export function searchList(path: string, admintoken?: string, searchParam?: SearchParamProps | any) {
  return new Promise<any>((resolve, reject) => {

    fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
      method: 'PATCH',
      headers: prepareHeaders(admintoken),
      body: JSON.stringify(searchParam)
    })
      .then(ret => ret.json())
      .then(result => {
        if (result.success) {
          resolve(result.data)
        } else {
          reject(result.error)
        }
      }).catch(reject)
  })
}