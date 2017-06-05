import React from "react";
import { IndexRoute, Route } from "react-router";
import SimpleLayout from "./containers/App/SimpleLayout";
import FullLayout from "./containers/App/FullLayout";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import Callback from "./containers/Login/Callback";
import NotFound from "./containers/NotFound/NotFound";
import Checkout from "./containers/Home/Checkout";
import Payment from "./containers/Payment/Payment";
import Audit from "./containers/Audit/Audit";

export default store => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { oidc: { user } } = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace("/");
      }
      cb();
    }
    checkAuth();
  };

  return (
    <Route>
      <Route path="/" name="Dashboard" component={SimpleLayout}>
        <IndexRoute component={Home} />
        <Route name="Login" path="login" component={Login} />
        <Route path="callback" component={Callback} />
        <Route path="checkout" component={Checkout} />
        <Route path="payment" component={Payment} />
        <Route path="audit" component={Audit} />
      </Route>

      <Route
        name="Admin"
        path="admin"
        onEnter={requireLogin}
        component={FullLayout}
      >
        <IndexRoute component={Home} />
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};