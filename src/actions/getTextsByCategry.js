import fetch from 'isomorphic-fetch';

const baseUrl = 'http://127.0.0.1:8360';

export const REQUEST_TEXTS_BYCATEGORY = 'REQUEST_TEXTS_BYCATEGORY';
export const RECEIVE_TEXTS_BYCATEGORY = 'RECEIVE_TEXTS_BYCATEGORY';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const INVALIDATE_TEXTS_BYCATEGORY = 'INVALIDATE_TEXTS_BYCATEGORY';

export function selectCategry(categoryId) {
  return {
    type: SELECT_CATEGORY,
    categoryId
  }
}

export function invalidateTexts(categoryId) {
  return {
    type: INVALIDATE_TEXTS_BYCATEGORY,
    categoryId
  }
}

function requestTexts(categoryId) {
  return {
    type: REQUEST_TEXTS_BYCATEGORY,
    categoryId
  }
}

function receiveTexts(categoryId, json) {
  return {
    type: RECEIVE_TEXTS_BYCATEGORY,
    categoryId,
    posts: json.length?json:new Array(),
    receivedAt: Date.now()
  }
}

function fetchTexts(categoryId) {
  return dispatch => {
    dispatch(requestTexts(categoryId));
    return fetch(`${baseUrl}/categories/${categoryId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTexts(categoryId, json)))
  }
}

export function fetchTextsIfNeeded(categoryId) {
  return (dispatch, getState) => {
    if (typeof categoryId !== 'undefined') {
      return dispatch(fetchTexts(categoryId));
    }
  }
}
