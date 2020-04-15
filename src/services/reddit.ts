import _ from 'lodash';
import { Subreddits, PostsFromSubreddit } from '../store/actionTypes';

const REDDIT_ENDPOINT: string= 'https://www.reddit.com';

class RedditService {
    async getDefaultSubreddits(): Promise<Subreddits> {
        const url = `${REDDIT_ENDPOINT}/subreddits/default.json`; 
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`RedditService getDefaultSubreddits failed, HTTP status ${response.status}`);
        }
        const _data = await response.json();
        const children = _data.data.children;
        if (!children) {
            throw new Error(`RedditService getDefaultSubreddits failed, children not returned`);
        }
        const sortedBySubscribers = _.orderBy(children, 'data.subscribers', 'desc');
        return _.map(sortedBySubscribers, (subreddit) => {
            return {
                title: _.get(subreddit, 'data.display_name'),
                description: _.get(subreddit, 'data.public_description'),
                url: _.get(subreddit, 'data.url'),
                header_img: _.get(subreddit, 'data.header_img'),
            }
        });
    }

    async getPostsFromSubreddit(subredditUrl: string): Promise<PostsFromSubreddit> {
        const url = `${REDDIT_ENDPOINT}${subredditUrl}hot.json`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`RedditService getPostsFromSubreddit failed, HTTP status ${response.status}`);
        }
        const data = await response.json();
        const children = _.get(data, 'data.children');
        if (!children) {
            throw new Error(`RedditService getPostsFromSubreddit failed, children not returned`);
        }
      
        return _.map(children, (post) => {
            const body = _.get(post, 'data.selftext');
            return {
                id: String(_.get(post, 'data.id', undefined)),
                title: String(_.get(post, 'data.title', undefined)),
                topicUrl: subredditUrl,
                body: String(body),
                thumbnail: this._validateUrl(_.get(post, 'data.thumbnail')),
                url: this._validateUrl(_.get(post, 'data.url')),
                ups: +_.get(post, 'data.ups'),
                video: _.get(post, 'data.is_video', false) ? {
                    url: this._validateUrl(_.get(post, 'data.media.reddit_video.fallback_url')),
                    height: +_.get(post, 'data.media.reddit_video.height'),
                    width: +_.get(post, 'data.media.reddit_video.width'),
                } : undefined
            }
        })
    }
    _validateUrl(url = '') {
        return url.startsWith('http') ? url : undefined;
    }
}

export default new RedditService();
