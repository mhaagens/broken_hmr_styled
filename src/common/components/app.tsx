import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import { hot } from "react-hot-loader";

import Home from "@common/components/pages/home";

class App extends Component<any> {
  render() {
    return (
      <Wrapper>
        <h1>App test</h1>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <GlobalStyle />
      </Wrapper>
    );
  }
}

const GlobalStyle = createGlobalStyle`
    ${normalize()};

    body {
      background: green;
    }
`;

const Wrapper = styled.main``;

export default hot(module)(App);
