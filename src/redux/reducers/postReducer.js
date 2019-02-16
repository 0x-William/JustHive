/**
 * Created by nick on 20/07/16.
 */
import { PostingActions } from 'ReduxActions';
import defaultState from './defaultState';

export const postingImages = (state = defaultState.postingImages, action) => {
  switch (action.type) {
    case PostingActions.UPDATE_POSTING_IMAGES:
      return action.payload;
    case PostingActions.UPDATE_IMAGE_VALUE:
      {
        const { index, key, value } = action.payload;
        const newState = state.slice();
        newState[index][key] = value;
        return newState;
      }
    default:
      return state;
  }
}
