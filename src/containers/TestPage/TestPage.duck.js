import config from '../../config';

const sharetribeSdk = require('sharetribe-flex-sdk');

// ================ Action types ================ //
export const TEST_LISTINGS_REQUEST = 'app/TestPage/SEARCH_LISTINGS_REQUEST';
// export const SEARCH_LISTINGS_SUCCESS = 'app/TestPage/SEARCH_LISTINGS_SUCCESS';
// export const SEARCH_LISTINGS_ERROR = 'app/TestPage/SEARCH_LISTINGS_ERROR';

export const SEARCH_MAP_LISTINGS_REQUEST = 'app/TestPage/SEARCH_MAP_LISTINGS_REQUEST';
// export const SEARCH_MAP_LISTINGS_SUCCESS = 'app/TestPage/SEARCH_MAP_LISTINGS_SUCCESS';
// export const SEARCH_MAP_LISTINGS_ERROR = 'app/TestPage/SEARCH_MAP_LISTINGS_ERROR';

// export const SEARCH_MAP_SET_ACTIVE_LISTING = 'app/TestPage/SEARCH_MAP_SET_ACTIVE_LISTING';

// ================ Reducer ================ //
// ======= (store, action) => store ======== //

// ================ Action creators ================ //
// Create new SDK instance
const sdk = sharetribeSdk.createInstance({
  clientId: 'ba9864e8-cc30-4631-b64e-530dc8dd8157',
});



sdk.listings
.query({ 
  per_page: 10,
  pub_category: 'wood,electric',
  pub_amenities: 'has_any:towels',
})
.then(res => {
  console.log(`res: ${res}`);
  // Print listing titles
  res.data.data.forEach(listing => {
    console.log(listing);
  });
})
.catch(res => {
  // An error occurred
  console.log(`Request failed with status: ${res.status} ${res.statusText}`);
});
export const searchMapListingsRequest = () => ({ type: SEARCH_MAP_LISTINGS_REQUEST });

export const searchMapListings = searchParams => (dispatch, getState, sdk) => {

  // dispatch(searchMapListingsRequest(searchParams));

  // const { perPage, ...rest } = searchParams;
  // const params = {
  //   ...rest,
  //   per_page: perPage,
  // };

  // return sdk.listings
  //   .query(params)
  //   .then(response => {
  //     dispatch(addMarketplaceEntities(response));
  //     dispatch(searchMapListingsSuccess(response));
  //     return response;
  //   })
  //   .catch(e => {
  //     dispatch(searchMapListingsError(storableError(e)));
  //     throw e;
  //   });
};
