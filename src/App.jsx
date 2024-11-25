import React from "react";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
import './App.css'
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/city/:cityName" element={<h3> City</h3>} />
              <Route
                path="*"
                element={
                  <div className="text-center text-3xl text-red-400 font-bold">
                    404
                  </div>
                }
              />
            </Routes>
          </Layout>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
