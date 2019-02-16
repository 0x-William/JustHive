/**
 * Created by nick on 20/07/16.
 */
import { createAction } from 'redux-actions';
export const UPDATE_POSTING_IMAGES = 'UPDATE_POSTING_IMAGES';
const updatePostingImages$ = createAction(UPDATE_POSTING_IMAGES);

export const UPDATE_IMAGE_VALUE = 'UPDATE_IMAGE_VALUE';
const updateImageValue$ = createAction(UPDATE_IMAGE_VALUE);

export const updatePostingImages = (images) =>
  (dispatch) => dispatch(updatePostingImages$(images));

export const updateImageValue = (index, key, value) =>
  (dispatch) => dispatch(updateImageValue$({ index, key, value }));
