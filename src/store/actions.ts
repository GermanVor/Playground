import { 
  ADD, POP,
  MainReducerActions,
  TOPICS_FETCHED, Subreddits,
  POSTS_FETCHED, PostsFromSubreddit,
  TOPIC_SELECTED, simpleTopic } from './actionTypes'

export function addToArr(data: Array<Number> | Number): MainReducerActions {
  return {
    type: ADD,
    data
  }
}

export function arrPop(): MainReducerActions {
  return {type: POP}
}

export function fetchTopics(subredditArray: Subreddits): MainReducerActions {
  return { 
    type: TOPICS_FETCHED,
    data: subredditArray
  }
}

export function fetchPosts( arr: PostsFromSubreddit): MainReducerActions {
  return {
    type: POSTS_FETCHED,
    data: arr
  }
}

export function selectTopic(data: simpleTopic): MainReducerActions  {
  return {
    type: TOPIC_SELECTED,
    data
  }
}