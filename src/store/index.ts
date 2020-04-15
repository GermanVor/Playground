import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'

import Reducer from './reducer'

const rootReducer = (history? :any) => combineReducers({
  main: Reducer
})

export type RootState = StateType< ReturnType<typeof rootReducer > >
export default rootReducer;