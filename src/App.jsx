import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Test from "./components/pages/Test";
import { StoreProvider } from "./store/StoreContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Router>
            <Routes>
              <Route path={"*"} element={<Test />} />
              <Route path={"/product"} element={<Test />} />
              <Route path={"/individual"} element={<Test />} />
              <Route path={"/transaction"} element={<Test />} />
              <Route path={"/checkout"} element={<Test />} />
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
