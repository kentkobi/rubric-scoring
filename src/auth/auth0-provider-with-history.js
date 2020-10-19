import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

require('dotenv').config()

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-4ryawwwh.au.auth0.com"
  const clientId = "BOU3oJlEWcxnPtLz5Ac5FCweZWTwqFoC"

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;