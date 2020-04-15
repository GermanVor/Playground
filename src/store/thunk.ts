import { Action, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

import redditService from '../services/reddit';
import { MainReducerActions } from '../store/actionTypes'
import { fetchTopics, fetchPosts, selectTopic } from './actions';

import { RootState } from './index'

export function thunkFetchTopics(): ThunkAction<void, RootState, unknown, MainReducerActions> {
  return async (dispatch) => {
      try {
          const subredditArray = await redditService.getDefaultSubreddits();
          dispatch(fetchTopics(subredditArray));
      } catch (error) {
          console.error(error);
      }
  };
}
//ThunkAction<void, RootState, unknown, Action<string>>
export function thunkfetchPosts(selectedTopicUrl: string)
: ThunkAction<void, RootState, unknown, MainReducerActions> {
  return async(dispatch: Dispatch) => {
    try {
      let url: string = 'https://www.reddit.com'+ selectedTopicUrl;
        dispatch( selectTopic( {title: selectedTopicUrl, url } ));
        const topicPosts = await redditService.getPostsFromSubreddit(selectedTopicUrl);
        dispatch(fetchPosts(topicPosts));
    } catch (error) {
        console.error(error);
    }
  }
}