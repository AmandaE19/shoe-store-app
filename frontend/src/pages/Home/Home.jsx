import React from "react";
import { AppContainer, AppLogo, AppHeader, AppLink } from "./Home.styles.js";

function App() {
  return (
    <AppContainer>
      <AppHeader>
        <AppLogo src="logo.svg" alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <AppLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </AppLink>
      </AppHeader>
    </AppContainer>
  );
}

export default App;
