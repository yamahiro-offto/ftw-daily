/**
 * CheckoutPage starts payment process and therefore it will get data from ListingPage
 * (booking dates, listing data, and all the other data that affects to booking decision).
 * This data is saved to Session Store which only exists while the browsing session exists -
 * e.g. tab is open. (Session Store is not related to session cookies.)
 */
import moment from 'moment';
import { reduce } from 'lodash';
import { types } from '../../util/sdkLoader';

// Validate that given 'obj' has all the keys of defined by validPropTypes parameter
// and values must pass related test-value-format function.
const validateProperties = (obj, validPropTypes) => {
  return reduce(
    Object.entries(validPropTypes),
    (acc, [prop, fn]) => {
      if (Object.prototype.hasOwnProperty.call(obj, prop) && fn(obj[prop])) {
        return acc;
      }
      return false;
    },
    true
  );
};

// Validate content of booking dates object received from SessionStore
export const isValidBookingDates = bookingDates => {
  const props = {
    bookingStart: d => d instanceof Date,
    bookingEnd: d => d instanceof Date,
  };
  return validateProperties(bookingDates, props);
};

// Validate content of listing object received from SessionStore.
// Currently only id & attributes.price are needed.
export const isValidListing = listing => {
  const props = {
    id: id => id instanceof types.UUID,
    attributes: v => {
      return typeof v === 'object' && v.price instanceof types.Money;
    },
  };
  return validateProperties(listing, props);
};

// Stores given bookingDates and listing to sessionStorage
export const storeData = (bookingDates, listing, storageKey) => {
  if (window && window.sessionStorage && listing && bookingDates) {
    // TODO: How should we deal with Dates when data is serialized?
    // Hard coded serializable date objects atm.
    /* eslint-disable no-underscore-dangle */
    const data = {
      bookingDates: {
        bookingStart: { date: bookingDates.bookingStart, _serializedType: 'SerializableDate' },
        bookingEnd: { date: bookingDates.bookingEnd, _serializedType: 'SerializableDate' },
      },
      listing,
      storedAt: { date: new Date(), _serializedType: 'SerializableDate' },
    };
    /* eslint-enable no-underscore-dangle */

    const storableData = JSON.stringify(data, types.replacer);
    window.sessionStorage.setItem(storageKey, storableData);
  }
};

// Get stored data
export const storedData = storageKey => {
  if (window && window.sessionStorage) {
    const checkoutPageData = window.sessionStorage.getItem(storageKey);

    // TODO How should we deal with Dates when data is serialized?
    // Dates are expected to be in format: { date: new Date(), _serializedType: 'SerializableDate' }
    const reviver = (k, v) => {
      // eslint-disable-next-line no-underscore-dangle
      if (typeof v === 'object' && v._serializedType === 'SerializableDate') {
        return new Date(v.date);
      }
      return types.reviver(k, v);
    };

    const { bookingDates, listing, storedAt } = checkoutPageData
      ? JSON.parse(checkoutPageData, reviver)
      : {};

    // If sessionStore contains freshly saved data (max 1 day old), use it
    const isFreshlySaved = storedAt
      ? moment(storedAt).isAfter(moment().subtract(1, 'days'))
      : false;

    if (isFreshlySaved && isValidBookingDates(bookingDates) && isValidListing(listing)) {
      return { bookingDates, listing };
    }
  }
  return {};
};