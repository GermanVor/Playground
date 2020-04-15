import React, { ReactNode } from 'react';
import { bindActionCreators, Dispatch } from 'redux';

import styles from '../style/rigthMenu.module.css';

import { MainReducerActions } from '../store/actionTypes';
import { connect } from 'react-redux';
import { MainReducerStore } from '../store/reducer';

import { selectTopic } from '../store/actions'
import { thunkFetchTopics, thunkfetchPosts} from '../store/thunk'
import  * as selectors from '../store/selectors';

function mapStateToProps(state: MainReducerStore){
  return { 
    getTopics: selectors.getTopics(state),
    getSimpleTopic: selectors.getSimpleTopic(state)
  };
}

const mapDispatchToProps = (dispatch: Dispatch<MainReducerActions>) => bindActionCreators({
  thunkFetchTopics,
  thunkfetchPosts,
  selectTopic
}, dispatch);


type Props = ReturnType<typeof mapStateToProps> &
ReturnType<typeof mapDispatchToProps> & {
   contant: ReactNode
};

type State = {
  menuToggleValue: string
}

class RightMenu extends React.Component<Props, State> {
  private containerRef = React.createRef<HTMLDivElement>();
  private menuRef = React.createRef<HTMLDivElement>();
  private menuElevator = React.createRef<HTMLDivElement>();

  constructor(props: Props){
    super(props);
    this.state = {
      menuToggleValue: '>'
    }
    this.menuOnClick = this.menuOnClick.bind(this);
    this.topickOnClick = this.topickOnClick.bind(this);
  }
  
  componentDidMount(){
    this.props.thunkFetchTopics();

    let menuElevator = this.menuElevator.current;

    window.addEventListener('scroll', ()=>{
      // eslint-disable-next-line no-restricted-globals
      if( pageYOffset > menuElevator!.offsetHeight ){
        menuElevator?.classList.add(styles['']);
      } else {
        
      }
    });

  }

  menuOnClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>){
    event?.preventDefault();

    this.containerRef.current?.classList.toggle(styles['Toggle']);
    this.menuRef.current?.classList.toggle(styles['Toggle']) ;
  }
  topickOnClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, url: string){
    event?.preventDefault();

    this.props.thunkfetchPosts(url);
  }
  render(){
    return (
      <div className={styles['RightMenu']} >
        <div className={styles['container']} ref={this.containerRef}>
          {this.props.contant}
        </div>
        <div className={styles['Menu']} ref={this.menuRef} >
          <div ref={this.menuElevator}>
            <div className={styles['Head']} > 
              <div className={styles['Tog']} onClick={this.menuOnClick} >
                <img src="https://img.icons8.com/ios-filled/50/000000/expand-arrow.png"/>
              </div>
              <div className={styles['Hide']}>
                <img src="https://img.icons8.com/ios-filled/50/000000/expand-arrow.png"/>
              </div>
            </div>
            
            <div className={styles.Items} >
              <div>
                {this.props.getTopics.map( (el, ind)=> (
                  <div key={el.title + ind.toString()} onClick={(event) => this.topickOnClick(event, el.url)} >
                    <h3>{el.title}</h3>
                    <p>{el.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>     
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);