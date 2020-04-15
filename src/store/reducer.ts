import * as ActionTypes from "./actionTypes";
import { Subreddits, PostsFromSubreddit, simpleTopic } from './actionTypes';
import {MainReducerActions } from './actionTypes'

export interface MainReducerStore {
  arr : Array<Number>,
  topics: Subreddits,
  posts: PostsFromSubreddit,
  simpleTopic?: simpleTopic,
}

const initialState: MainReducerStore = {
  arr : [0],
  topics: [],
  simpleTopic: undefined,
  posts: [],
}

export default function Reducer(state: MainReducerStore = initialState, action: MainReducerActions): MainReducerStore{
  switch (action.type) {
    case ActionTypes.ADD: {
      return {...state, arr: state.arr.concat(action.data) }
    }
    case ActionTypes.POP: {
      return {...state, arr: state.arr.slice(0, state.arr.length-1) }
    }
    case ActionTypes.TOPICS_FETCHED: {
      return {...state, topics: action.data}
    }
    case ActionTypes.TOPIC_SELECTED: {
      return {...state, simpleTopic: action.data}
    }
    case ActionTypes.POSTS_FETCHED: {
      return {...state, posts: action.data}
    }
    default: {
      return state;
    }
  }
}
