/**
 * Created by nick on 20/07/16.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PostingActions } from 'ReduxActions';
import { createSelector } from 'reselect';

export const postingImages$ = (state) => state.postingImages;
const selector$ = createSelector(postingImages$,
  (postingImages) => ({
    postingImages
  })
);

const mapStateToProps = (state) => ({ ...selector$(state) });
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...PostingActions }, dispatch);

export default (component) => connect(mapStateToProps, mapDispatchToProps)(component);
