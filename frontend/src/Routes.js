import React from "react";
import { Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

const Routes = () => {
  return (
    <main className="py-3">
      <Container>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/products/:id" component={ProductScreen} />
      </Container>
    </main>
  );
};

export default Routes;
