import React, {Fragment, useContext, useEffect} from "react";
import Page from "./wrappers/Page";
// Components
import Sales from "./Sales";
import Offers from "./Offers";
import Summer from "./Summer";
import SetPrice from "./SetPrice";

import AuthContext from "../context/auth/authContext";
import ItemContext from "../context/items/itemContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const itemContext = useContext(ItemContext);

  const {loadUser, token} = authContext;
  const {getAllData} = itemContext;

  useEffect(() => {
    if (token) loadUser();
    window.scrollTo(0, 0);
    getAllData();
    //eslint-disable-next-line
  }, [token]);

  return (
    <Page title="Home">
      <Fragment>
        <Sales />
        <Offers />
        <Summer />
        <SetPrice />
      </Fragment>
    </Page>
  );
};

export default Home;
