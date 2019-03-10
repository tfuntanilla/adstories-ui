import { GENERATE_PENDING, GENERATE_DONE } from './Constants.js';

const defaultState = {
  results: [],
  status: ''
}

export default function generate(state = defaultState, action) {
  switch(action.type) {
    case GENERATE_PENDING: {
      return {...state, status: 'PENDING'}
    }
    case GENERATE_DONE: {
      return {results: [...action.results], status: 'DONE'}
    }
    default: {
      return state;
    }
  }
}
