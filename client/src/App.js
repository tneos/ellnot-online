import React, {Fragment} from "react";

import "./css/main.css";

// Components
import Header from "./components/Header";
import SubMenus from "./components/SubMenus";
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";
import Page from "./components/wrappers/Page";

// Contexts
import SubMenuState from "./context/subMenu/SubMenuState";

const App = () => {
  return (
    <SubMenuState>
      <Page title="Home">
        <Fragment>
          <Header />
          <SubMenus />
          <Navbar />
          <Footer />
        </Fragment>
      </Page>
    </SubMenuState>
  );
};

export default App;
