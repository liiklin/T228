import { combineReducers } from 'redux'
import {
  REQUEST_TEXTS, RECEIVE_TEXTS,
  SELECT_CATEGRY, INVALIDATE_TEXTS
} from '../actions/getTextsByCategry';

function selectedCategry(state = '1', action) {
  switch (action.type) {
    case SELECT_CATEGRY:
      return action.reddit
    default:
      return state
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_TEXTS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_TEXTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_TEXTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function textsByCategry(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_TEXTS:
    case RECEIVE_TEXTS:
    case REQUEST_TEXTS:
      return Object.assign({}, state, {
        [action.reddit]: posts(state[action.reddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  textsByCategry,
  selectedCategry
})

export default rootReducer
