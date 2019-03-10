import * as request from 'superagent';

export function post(path, requestBody = {}) {
  return new Promise((resolve, reject) => {
    request.post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(JSON.stringify(requestBody))
      .then(resp => resolve(resp), error => reject(error))
  })
}

export async function generateAPIRequest(requestBody) {
  return await post('/gen', requestBody)
    .then(resp => ({
      results: resp.body
    }));
}
