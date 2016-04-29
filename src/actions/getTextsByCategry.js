import fetch from 'isomorphic-fetch';

const baseUrl = 'http://0.0.0.0:8360';

export const REQUEST_TEXTS = 'REQUEST_TEXTS';
export const RECEIVE_TEXTS = 'RECEIVE_TEXTS';
export const SELECT_CATEGRY = 'SELECT_CATEGRY';
export const INVALIDATE_TEXTS = 'INVALIDATE_TEXTS';

export function selectCategry(categoryId) {
  console.log(categoryId);
  return {
    type: SELECT_CATEGRY,
    categoryId
  }
}

export function invalidateTexts(categoryId) {
  console.log(categoryId);
  return {
    type: INVALIDATE_TEXTS,
    categoryId
  }
}

function requestTexts(categoryId) {
  console.log(categoryId);
  return {
    type: REQUEST_TEXTS,
    categoryId
  }
}

function receiveTexts(categoryId, json) {
  console.log(json);
  return {
    type: RECEIVE_TEXTS,
    categoryId,
    posts: json.length?json:new Array(),
    receivedAt: Date.now()
  }
}

function fetchTexts(categoryId) {
  return dispatch => {
    dispatch(requestTexts(categoryId))
    return fetch(`${baseUrl}/categories/${categoryId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTexts(categoryId, json)))
  }
}

export function fetchPostsIfNeeded(categoryId) {
  console.log(categoryId);
  return (dispatch, getState) => {
      return dispatch(fetchTexts(categoryId))
  }
}
