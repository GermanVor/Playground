import React from 'react';
import styles from '../style/field.module.css'

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { MainReducerStore } from '../store/reducer';
import { MainReducerActions } from '../store/actionTypes'

import { thunkfetchPosts } from '../store/thunk'
import  * as selectors from '../store/selectors';

function mapStateToProps(state: MainReducerStore){
  return { 
    getPosts: selectors.getPosts(state.posts),
  };
}

const mapDispatchToProps = (dispatch: Dispatch<MainReducerActions>) => bindActionCreators({
  thunkfetchPosts
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
ReturnType<typeof mapDispatchToProps> & {
}

interface State {
}

class Field extends React.Component<Props, State>{
  private ref = React.createRef<HTMLDivElement>();

  constructor(props: Props){
    super(props);
    this.state = {}
  }
  componentDidMount(){
    this.props.thunkfetchPosts('/r/popular/');
  }
  render(){
    return(
      <div className={styles["Field"]} ref={this.ref} >
        <section>
          {this.props.getPosts.map( (el,ind)=>(
            <article key={el.id}>
              <h2><a href={el.url}>{el.title}</a></h2>
              <h3><a href={el.title} >{el.topicUrl}</a></h3>
              <p>{el.body}</p>
              { 
                el.thumbnail ? <img className="thumbnail" src={el.thumbnail} alt="thumbnail"/>:
                el.video ? <video><source src={el.video.url} /></video> : ''
              }
            </article>
          ))}
        </section>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Field);