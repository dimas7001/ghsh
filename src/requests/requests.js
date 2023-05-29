let commonHeaders = {
  "Content-Type": "application/json"
}

export const sendPOST = async (path, headers, body) => {
  return fetch(path, {
    method: "POST",
    headers: Object.assign({}, commonHeaders, headers),
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .catch(e => console.error(e))
}

export const sendPUT = async (path, headers, body) => {
  return fetch(path, {
    method: "PUT",
    headers: Object.assign({}, commonHeaders, headers),
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .catch(e => console.error(e))
}

export const sendGET = async (path, headers) => {
  return fetch(path, {
    headers: Object.assign({}, commonHeaders, headers)
  })
  .then(response => response.json())
  .catch(e => console.error(e))
}

export const sendDELETE = async (path, headers) => {
  return fetch(path, {
    method: "DELETE",
    headers: Object.assign({}, commonHeaders, headers),
  })
  .then(response => response.json())
  .catch(e => console.error(e))
}
