import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import * as Actions from '../src/Store/Actions/Actions';
import Signup from '../src/Screens/Auth/Signup';

const mockNavigation = {
  navigate: jest.fn(),
  replace: jest.fn(),
};

const mockStore = configureStore([]);
jest.mock('react-native-simple-toast', () => ({
  show: jest.fn(),
}));
jest.mock('react-native-phone-number-input', () => 'PhoneInput');
jest.mock('@react-native-community/checkbox', () => 'CheckBox');
jest.mock('../../Store/Actions/Actions', () => ({
  initLogin: jest.fn(),
  loginFailure: jest.fn(),
}));

describe('Signup Screen', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      data: {
        dashboardStatus: null,
        data: null,
        loading: false,
      },
    });

    component = render(
      <Provider store={store}>
        <Signup navigation={mockNavigation} />
      </Provider>,
    );
  });

  it('renders Signup screen correctly', () => {
    const {getByText, getByPlaceholderText} = component;

    // Check if necessary texts and components are rendered
    expect(getByText('Enter your mobile number')).toBeTruthy();
    expect(getByPlaceholderText('Enter Mobile Number')).toBeTruthy();
    expect(getByText('Send OTP')).toBeTruthy();
  });

  it('should dispatch initLogin when valid mobile number is provided and Send OTP is pressed', () => {
    const {getByPlaceholderText, getByText} = component;

    // Enter a valid mobile number
    const phoneInput = getByPlaceholderText('Enter Mobile Number');
    fireEvent.changeText(phoneInput, '+919876543210');

    // Press the Send OTP button
    const sendOtpButton = getByText('Send OTP');
    fireEvent.press(sendOtpButton);

    // Assert that the initLogin action was dispatched
    expect(Actions.initLogin).toHaveBeenCalledWith('+919876543210');
  });

  it('should show a toast when an invalid mobile number is entered', () => {
    const {getByPlaceholderText, getByText} = component;

    // Enter an invalid mobile number
    const phoneInput = getByPlaceholderText('Enter Mobile Number');
    fireEvent.changeText(phoneInput, '12345');

    // Press the Send OTP button
    const sendOtpButton = getByText('Send OTP');
    fireEvent.press(sendOtpButton);

    // Expect that the toast shows an error message
    expect(require('react-native-simple-toast').show).toHaveBeenCalledWith(
      'Enter a valid mobile number',
      expect.any(Number),
    );
  });

  it('navigates to VerifyOtp screen when signup is successful', async () => {
    store = mockStore({
      data: {
        dashboardStatus: 200,
        data: {
          user_id: '12345',
          message: 'OTP sent',
        },
        loading: false,
      },
    });

    component.rerender(
      <Provider store={store}>
        <Signup navigation={mockNavigation} />
      </Provider>,
    );

    // Wait for async code to execute
    await waitFor(() => {
      expect(mockNavigation.replace).toHaveBeenCalledWith('VerifyOtp', {
        userId: '12345',
        mobileNumber: '+919876543210',
      });
    });
  });

  it('displays an error message when signup fails', async () => {
    store = mockStore({
      data: {
        dashboardStatus: 201,
        data: {
          message: 'Signup failed',
        },
        loading: false,
      },
    });

    component.rerender(
      <Provider store={store}>
        <Signup navigation={mockNavigation} />
      </Provider>,
    );

    // Wait for async code to execute
    await waitFor(() => {
      expect(require('react-native-simple-toast').show).toHaveBeenCalledWith(
        'Signup failed',
        expect.any(Number),
      );
    });
  });

  it('should toggle the checkbox value when clicked', () => {
    const {getByRole} = component;

    // Find the checkbox
    const checkbox = getByRole('checkbox');

    // Checkbox should be checked by default
    expect(checkbox.props.value).toBe(true);

    // Toggle the checkbox
    fireEvent.press(checkbox);

    // Checkbox should now be unchecked
    expect(checkbox.props.value).toBe(false);
  });
});
