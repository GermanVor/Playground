import { Interface } from "readline";

export const ADD = 'ADD';
export const POP = 'POP';
export const TOPICS_FETCHED = 'TOPICS_FETCHED';
export const POSTS_FETCHED = 'POSTS_FETCHED';
export const TOPIC_SELECTED = 'TOPIC_SELECTED';

interface arrAddAction {
  type: typeof ADD,
  data: Array<Number> | Number
}

interface arrPopAction {
  type: typeof POP
}

export interface Subreddits extends Array<{
  title: string,
  description?: string,
  url: string,
  header_img?: string,
}>{}

export interface PostsFromSubreddit extends Array<{
  id: string,
  title: string,
  topicUrl?: string,
  body?: string | undefined,
  thumbnail?: string,
  url?: string,
  ups: number,
  video?: {
    url?: string,
    height: number,
    width: number,
  }
}>{}

export interface simpleTopic {
  title: string,
  url: string
} 

interface fetchTopics {
  type: typeof TOPICS_FETCHED,
  data: Subreddits
}
interface fetchPosts {
  type: typeof POSTS_FETCHED,
  data: PostsFromSubreddit
}
interface selectedTopic {
  type: typeof TOPIC_SELECTED,
  data: simpleTopic
}
export type MainReducerActions = arrAddAction | arrPopAction | fetchTopics | fetchPosts | selectedTopic