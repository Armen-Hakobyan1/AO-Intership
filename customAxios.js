import { CustomPromise } from "./customPromise";

function axios(config) {
  return new CustomPromise(function(resolve, reject) {

    fetch(config.url, {
      method: config.method || 'GET',
      headers: config.headers,
      body: config.data
    })
      .then(function(response) {
        if (response.ok) {

          resolve(response.json());
        } else {

          reject(new Error('Request failed'));
        }
      })
      .catch(function(error) {

        reject(new Error('Request failed: ' + error.message));
      });
  });
}