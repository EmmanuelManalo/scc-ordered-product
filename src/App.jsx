import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Individual from "./components/pages/developer/individual/Individual";
import Product from "./components/pages/developer/product/product";
import { StoreProvider } from "./store/StoreContext";
import Checkout from "./components/pages/developer/checkout/Checkout";
import Transaction from "./components/pages/developer/transaction/Transaction";
import { devNavUrl } from "./components/helpers/functions-general";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Router>
            <Routes>
              <Route path={"*"} element={<div>404 | Page not found</div>} />
              <Route path={`${devNavUrl}/product`} element={<Product />} />
              <Route
                path={`${devNavUrl}/individual`}
                element={<Individual />}
              />
              <Route
                path={`${devNavUrl}/transaction`}
                element={<Transaction />}
              />
              <Route path={`${devNavUrl}`} element={<Checkout />} />
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
