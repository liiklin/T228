import fetch from 'isomorphic-fetch';

const baseUrl = 'http://127.0.0.1:8360';

export const REQUEST_TEXTS = 'REQUEST_TEXTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_CATEGRY = 'SELECT_CATEGRY';
export const INVALIDATE_TEXTS = 'INVALIDATE_TEXTS';

export function selectCategry(word) {
  return {
    type: SELECT_CATEGRY,
    word
  }
}

export function invalidateTexts(word) {
  return {
    type: INVALIDATE_TEXTS,
    word
  }
}

function requestTexts(word) {
  return {
    type: REQUEST_TEXTS,
    word
  }
}

function receiveTexts(word, json) {
  return {
    type: RECEIVE_POSTS,
    word,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchTexts(word) {
  return dispatch => {
    dispatch(requestTexts(word))
    return fetch(`${baseUrl}/texts?word=${word}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTexts(word, json)))
  }
}

export function fetchPostsIfNeeded(word) {
  return (dispatch, getState) => {
      return dispatch(fetchPosts(word))
  }
}
