import React from 'react';
import styles from '../style/head.module.css'

import { simpleTopic } from '../store/actionTypes'
class Head extends React.Component<{topic: simpleTopic | undefined}, {}>{
  private ref = React.createRef<HTMLDivElement>();

  constructor(props: {topic: simpleTopic}){
    super(props);
    this.state = {}
  }

  render(){

    return (
      <div className={styles["Head"]} ref={this.ref} >
        <h1 className={styles['Label']}><a href='https://www.reddit.com/' >REddIt</a></h1>
        {this.props.topic ? <h2><a href={this.props.topic.url} >{this.props.topic.title}</a></h2>: ''}
      </div>
    )
  }

}

export default Head;