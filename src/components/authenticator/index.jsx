import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";

import Form from "../../pages/Form";
import Login from "../../pages/Login";
import Header from "../header/index";
import FormSucess from "../../pages/FormSucess";
import User from "../../pages/User";
import UserFeedBack from "../userfeedbacks";
import FeedbackForm from "../feedbackform";

const Authenticator = () => {
  const [isAuthenticated, setAuthentication] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");

    if (!token) {
      setAuthentication(false);
    }

    axios
      .get("https://ka-users-api.herokuapp.com/users", {
        headers: { Authorization: token },
      })
      .then(() => {
        setAuthentication(true);
        history.push("/users");
      })
      .catch(() => {
        setAuthentication(false);
      });
    if (!isAuthenticated) {
      localStorage.removeItem("authToken");
      history.push("/");
    }
  }, [history, isAuthenticated]);

  if (isAuthenticated === undefined) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <Header
          isAuthenticated={isAuthenticated}
          setAuthentication={setAuthentication}
        />
        <Switch>
          <Route exact path="/">
            <Form />
          </Route>
          <Route exact path="/login">
            <Login setAuthentication={setAuthentication} />
          </Route>
          <Route exact path="/sucess">
            <FormSucess />
          </Route>
        </Switch>
      </>
    );
  }

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        setAuthentication={setAuthentication}
      />
      <Switch>
        <Route exact path="/">
          <Form />
        </Route>

        <Route exact path="/login">
          <Login setAuthentication={setAuthentication} />
        </Route>

        <Route exact path="/sucess">
          <FormSucess />
        </Route>

        <Route exact path="/users">
          <User />
        </Route>

        <Route exact path="/users/feedbacks/:id">
          <UserFeedBack />
        </Route>

        <Route exact path="/users/feedbacks/:id/new">
          <FeedbackForm />
        </Route>
      </Switch>
    </>
  );
};

export default Authenticator;
