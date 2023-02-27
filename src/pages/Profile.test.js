import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Profile } from './Profile';

const mockStore = configureStore([]);

describe('Profile Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        email: 'test@example.com',
      },
    });
    jest.clearAllMocks();
  });

  it('should render Profile component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    expect(getByText('Name:')).toBeInTheDocument();
    expect(getByText('Email:')).toBeInTheDocument();
    expect(getByText('Phone:')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  // other test cases here
});