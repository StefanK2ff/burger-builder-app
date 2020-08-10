import React from "react";
import Layout from "./components/Layouts/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder/>
        <Checkout />
      </Layout>
    </div>
  );
}

export default App;
