import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import config from '../../config';
import {
  Page,
  SectionHero,
  SectionHowItWorks,
  SectionLocations,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  // Button,
} from '../../components';
import { TopbarContainer } from '../../containers';

import facebookImage from '../../assets/saunatimeFacebook-1200x630.jpg';
import twitterImage from '../../assets/saunatimeTwitter-600x314.jpg';
import css from './TestPage.css';

import Button, {PrimaryButton, SecondaryButton, InlineTextButton} from '../../components/Button/Button.js'

const sharetribeSdk = require('sharetribe-flex-sdk');
const CLIENT_ID = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID;
const BASE_URL = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL;
const TRANSIT_VERBOSE = process.env.REACT_APP_SHARETRIBE_SDK_TRANSIT_VERBOSE === 'true';


export const TestPageComponent = props => {
  // const { history, intl, location, scrollingDisabled } = props;
  const { scrollingDisabled } = props;

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  // const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
  // const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });
  // const schemaImage = `${config.canonicalRootURL}${facebookImage}`;


  // // Get handle to tokenStore
  // // We check in unauthorized cases if requests have set tokens to cookies
  // const tokenStore = sharetribeSdk.tokenStore.expressCookieStore({
  //   clientId: CLIENT_ID,
  //   req,
  //   res,
  //   secure: USING_SSL,
  // });

  // const baseUrl = BASE_URL ? { baseUrl: BASE_URL } : {};

  // const sdk = sharetribeSdk.createInstance({
  //   transitVerbose: TRANSIT_VERBOSE,
  //   clientId: CLIENT_ID,
  //   httpAgent: httpAgent,
  //   httpsAgent: httpsAgent,
  //   tokenStore,
  //   typeHandlers: [
  //     {
  //       type: sharetribeSdk.types.BigDecimal,
  //       customType: Decimal,
  //       writer: v => new sharetribeSdk.types.BigDecimal(v.toString()),
  //       reader: v => new Decimal(v.value),
  //     },
  //   ],
  //   ...baseUrl,
  // });

  function onMainButtonClick(e){
    // const a = document.getElementsByClassName('.PrimaryButton');
  }
  
  return (
    <Page title={siteTitle} scrollingDisabled={scrollingDisabled}>
      <LayoutSingleColumn>
      
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="TestPage" />
        </LayoutWrapperTopbar>
        
        <LayoutWrapperMain>
          <div>
            <li>It is TestPage!</li>
            <li>{siteTitle}</li>
          </div>
          
          <Button props={{
            rootClassName: LayoutWrapperMain,
            className: '',
            
            inProgress: true,
            ready: false,
            disabled: false,
            
            children: null,
          }}>Push</Button>
          
          <div>
            <PrimaryButton ready onClick={onMainButtonClick}>
              Click me
            </PrimaryButton>
          </div>
      
        </LayoutWrapperMain>
        
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
        
      </LayoutSingleColumn>
    </Page>
  );
};

const { bool, object } = PropTypes;

TestPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const TestPage = compose(
  withRouter,
  connect(mapStateToProps),
  injectIntl
)(TestPageComponent);

export default TestPage;
