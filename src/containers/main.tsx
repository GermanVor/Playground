import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import '../style/main.css';
import Head from './head';
import Field from './Field';
import RightMenu from './rightMenu';
 
import { MainReducerStore } from '../store/reducer';
import  * as selectors from '../store/selectors';
import * as postsActions from '../store/actions'

function mapStateToProps(state: MainReducerStore){
  return { 
    getTopic: selectors.getSimpleTopic(state)
  };
}

function mapDispatchToProps(dispatch: Dispatch){
  return {
    addToArr: (data: Array<Number> | Number ) => {
        dispatch(postsActions.addToArr(data)) 
    },
  }
}

type Props =  ReturnType<typeof mapStateToProps> &
ReturnType<typeof mapDispatchToProps> & {

}
type State = {
  
}

class Main extends React.Component<Props, State> {
  private ref = React.createRef<HTMLDivElement>();
 
  constructor(props: Props){
    super(props);
    this.state = {
    }
  }
  componentWillMount(){
  }
  componentDidMount(){
    this.props.addToArr(6);
  }
  render(){
    return (
      <div className="Main" ref={this.ref} >
        <Head topic={this.props.getTopic} />
         
        <RightMenu contant={<Field />} />
      </div>
    )
  }

}



export default connect(mapStateToProps,mapDispatchToProps)(Main);