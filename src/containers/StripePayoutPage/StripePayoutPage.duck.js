import { createStripeAccount, updateStripeAccount } from '../../ducks/stripe.duck';
import { fetchCurrentUser } from '../../ducks/user.duck';

// ================ Action types ================ //

export const SET_INITIAL_STATE = 'app/StripePayoutPage/SET_INITIAL_STATE';
export const SAVE_PAYOUT_DETAILS_REQUEST = 'app/StripePayoutPage/SAVE_PAYOUT_DETAILS_REQUEST';
export const SAVE_PAYOUT_DETAILS_SUCCESS = 'app/StripePayoutPage/SAVE_PAYOUT_DETAILS_SUCCESS';
export const SAVE_PAYOUT_DETAILS_ERROR = 'app/StripePayoutPage/SAVE_PAYOUT_DETAILS_ERROR';

// ================ Reducer ================ //

const initialState = {
  payoutDetailsSaveInProgress: false,
  payoutDetailsSaved: false,
};

export default function payoutPreferencesPageReducer(state = initialState, action = {}) {
  const { type } = action;
  switch (type) {
    case SET_INITIAL_STATE:
      return initialState;

    case SAVE_PAYOUT_DETAILS_REQUEST:
      return { ...state, payoutDetailsSaveInProgress: true };
    case SAVE_PAYOUT_DETAILS_ERROR:
      return { ...state, payoutDetailsSaveInProgress: false };
    case SAVE_PAYOUT_DETAILS_SUCCESS:
      return { ...state, payoutDetailsSaveInProgress: false, payoutDetailsSaved: true };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

export const savePayoutDetailsRequest = () => ({
  type: SAVE_PAYOUT_DETAILS_REQUEST,
});
export const savePayoutDetailsError = () => ({
  type: SAVE_PAYOUT_DETAILS_ERROR,
});
export const savePayoutDetailsSuccess = () => ({
  type: SAVE_PAYOUT_DETAILS_SUCCESS,
});

// ================ Thunks ================ //

export const savePayoutDetails = values => (dispatch, getState, sdk) => {
  dispatch(savePayoutDetailsRequest());

  if (!values.country) {
    return dispatch(updateStripeAccount(values))
      .then(() => dispatch(savePayoutDetailsSuccess()))
      .catch(() => dispatch(savePayoutDetailsError()));
  }

  return dispatch(createStripeAccount(values))
    .then(() => dispatch(savePayoutDetailsSuccess()))
    .catch(() => dispatch(savePayoutDetailsError()));
};

export const getVerificationLink = values => (dispatch, getState, sdk) => {
  // const { accountId, failureUrl, successUrl, type } = values;
  console.log('TODO: get verification link');
  console.log('Params:', values);

  // TODO fetch the real link
  return new Promise((resolve, reject) => {
    resolve('https://connect.stripe.com/setup/c/trhRkuxi2SZo');
  });
};

export const loadData = () => (dispatch, getState, sdk) => {
  // Clear state so that previously loaded data is not visible
  // in case this page load fails.
  dispatch(setInitialState());

  return dispatch(fetchCurrentUser());
};