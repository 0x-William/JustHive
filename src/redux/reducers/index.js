/**
 * Created by nick on 20/07/16.
 */
/**
 * @providesModule ReduxReducers
 */
import { combineReducers } from 'redux';
import { postingImages } from './postReducer';

export default combineReducers({
  postingImages
});

