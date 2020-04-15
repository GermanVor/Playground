import { MainReducerStore } from './reducer'
import { Subreddits, PostsFromSubreddit, simpleTopic } from './actionTypes'

export function getLength(state: MainReducerStore):Number {
  return state.arr[state.arr.length-1];
}

export function getArr(state: MainReducerStore): Array<Number> {
  return state.arr;
}

// функция только для контроля 
export function getState(state: MainReducerStore): MainReducerStore  {
  return state;
}

export function getPosts(posts: PostsFromSubreddit): PostsFromSubreddit {
  //я не понимаю как это говно может быть undefind 
  return posts
}

export function getTopics(state: MainReducerStore): Subreddits {
  //тоже самое 
  return state.topics
}

export function getSimpleTopic(state: MainReducerStore): simpleTopic | undefined{
  return state.simpleTopic;
}