import React from "react";
import Layout from "./components/Layouts/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";

function App() {
  return (
    <div>
      <Layout>
        <p>Hello there, general Kenobi.</p>
        <BurgerBuilder/>
      </Layout>
    </div>
  );
}

export default App;
