import {
  AuthenticationContext,
  adalFetch,
  withAdalLogin
} from 'react-adal';

export const adalConfig = {
  tenant: '9171ae98-90e7-4cbc-9fc1-bf54835475c1',
  clientId: 'cd09a212-1843-4c0f-9282-fbbbe56e6aac',
  endpoints: {
    api: 'cd09a212-1843-4c0f-9282-fbbbe56e6aac',
  },
  cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);