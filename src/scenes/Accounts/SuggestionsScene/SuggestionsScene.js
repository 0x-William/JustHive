/**
 * Created by simply on 7/21/16.
 */
import React, { Component, PropTypes } from 'react';
import { SuggestionsContainer } from 'AppContainers';

export const SuggestionsScene = ({ resetRouteStack, onBack, routeScene }) => (
  <SuggestionsContainer
    onSubmit={resetRouteStack}
    onBack={onBack}
    addFromContacts={() => routeScene('SearchContactsScene')}
    connectFacebook={() => {}}
  />
);

SuggestionsScene.propTypes = {
  resetRouteStack: PropTypes.func.isRequired
};
