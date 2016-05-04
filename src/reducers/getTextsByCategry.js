import { combineReducers } from 'redux';
import {
  REQUEST_TEXTS_BYCATEGORY, RECEIVE_TEXTS_BYCATEGORY,
  SELECT_CATEGORY, INVALIDATE_TEXTS_BYCATEGORY
} from '../actions/getTextsByCategry';

function selectedCategry(state = '-1', action) {
  switch (action.type) {
    case REQUEST_TEXTS_BYCATEGORY:
      return action.categoryId;
    default:
      return state;
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case RECEIVE_TEXTS_BYCATEGORY:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_TEXTS_BYCATEGORY:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_TEXTS_BYCATEGORY:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function textsByCategry(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_TEXTS_BYCATEGORY:
    case RECEIVE_TEXTS_BYCATEGORY:
    case REQUEST_TEXTS_BYCATEGORY:
      return Object.assign({}, state, {
        [action.categoryId]: posts(state[action.categoryId], action)
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  textsByCategry,
  selectedCategry
})

export default rootReducer
