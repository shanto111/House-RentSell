import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { router } from "./Route/Route/Route.jsx";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="">
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </div>
);
