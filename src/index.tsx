import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { Auth0Provider } from "@auth0/auth0-react"

import { store } from "./app/store"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={`https://${process.env.REACT_APP_DOMAIN}`}
        clientId={`${process.env.REACT_APP_CLIENT_ID}`}
        audience={`${process.env.REACT_APP_AUDIENCE}`}
        useRefreshTokens={true}
        cacheLocation="localstorage"
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
