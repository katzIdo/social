import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { appStyle } from "./styles/app";
import AppMenu from "./components/AppMenu/AppMenu";
import User from "./components/User/User";

const localGraphQL = "http://localhost:4000/graphql";

const client = new ApolloClient({
  uri: localGraphQL
});

const HomePage = () => <div>This is a Home Page</div>;
const LoginPage = () => <div>This is a Login Page</div>;
const RegisterPage = () => <div>This is a Register Page</div>;
const MyAccountPage = () => <div>This is the Profile Page</div>;
const AboutPage = () => <div>This is an About Page</div>;
const ContactPage = () => <div>This is a Contact Page</div>;

const App = () => {
  const classes = appStyle();

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <AppMenu />
              <Typography variant="h6" className={classes.title}>
                Social
              </Typography>
              <User />
            </Toolbar>
          </AppBar>
          <div className="container">
            <Route path="/" exact component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/myAccount" component={MyAccountPage} />
          </div>
          <footer>TO DO FOOTER</footer>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
