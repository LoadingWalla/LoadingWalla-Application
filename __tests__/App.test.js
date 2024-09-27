import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import App from '../App';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {PermissionsAndroid, Platform} from 'react-native';

// Mock dependencies
jest.mock('react-native-reanimated', () => {});
jest.mock('react-native-gesture-handler', () => {});
jest.mock('../src/Navigation/router', () => 'Navigation'); // Mock Navigation component
jest.mock('../src/Screens/Details/NoInternetScreen', () => 'NoInternetScreen'); // Mock NoInternetScreen
jest.mock('../src/Utils/Notification_helper', () => ({
  foregroundNotification: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: jest.fn().mockImplementation(({children}) => children),
}));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); // Mock Animated API

// Mock Android permissions
PermissionsAndroid.request = jest.fn();

// Mock Redux store
const mockStore = configureStore([]);
const store = mockStore({});

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('renders the App component correctly', async () => {
    const {getByText} = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    // Check if "NoInternetScreen" and "Navigation" components are rendered
    expect(getByText('NoInternetScreen')).toBeTruthy();
    expect(getByText('Navigation')).toBeTruthy();
  });

  it('calls the foregroundNotification on mount', async () => {
    const {
      foregroundNotification,
    } = require('../src/Utils/Notification_helper');

    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    // Ensure that foregroundNotification is called when the component mounts
    await waitFor(() => {
      expect(foregroundNotification).toHaveBeenCalledTimes(1);
    });
  });

  it('requests notification permission on Android', async () => {
    PermissionsAndroid.request.mockResolvedValueOnce('granted');

    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    // Ensure that PermissionsAndroid.request is called for notification permissions
    await waitFor(() => {
      expect(PermissionsAndroid.request).toHaveBeenCalledWith(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    });
  });

  it('does not request notification permission on non-Android platforms', async () => {
    const originalPlatform = Platform.OS;
    Platform.OS = 'ios'; // Simulate running on iOS

    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    // PermissionsAndroid.request should not be called on iOS
    expect(PermissionsAndroid.request).not.toHaveBeenCalled();

    Platform.OS = originalPlatform; // Reset the platform after the test
  });
});
