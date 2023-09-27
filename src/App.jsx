import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Individual from "./components/pages/developer/individual/Individual";
import Product from "./components/pages/developer/product/product";
import Transaction from "./components/pages/developer/transaction/transaction";
import { StoreProvider } from "./store/StoreContext";
import Checkout from "./components/pages/developer/checkout/Checkout";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Router>
            <Routes>
              <Route path={"*"} element={<Product />} />
              <Route path={"/product"} element={<Product />} />
              <Route path={"/individual"} element={<Individual />} />
              <Route path={"/transaction"} element={<Transaction />} />
              <Route path={"/checkout"} element={<Checkout />} />
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
