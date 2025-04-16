import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../../utils/redux';

const store = createStore();

export const ReduxWrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
