import { GENERATE_PENDING, GENERATE_DONE } from './Constants.js';
import _ from 'lodash';

import { generateAPIRequest } from './Services.js';

const generatePending = () => ({
  type: GENERATE_PENDING,
  results: []
});

function generateDone(status, resp) {
  const data = _.get(resp, 'results.Data', '[]');
  let results = status === 'success' ? JSON.parse(data): [];
  return {
    type: GENERATE_DONE,
    results
  };
}

export const generateAPI = requestBody => {
  return dispatch => {
    dispatch(generatePending());
    return generateAPIRequest(requestBody)
      .then(
        res => dispatch(generateDone('success', res)),
        error => dispatch(generateDone('error', error))
      );
  };
}
