import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gig from "./pages/gig/Gig";
import Gigs from "./pages/gigs/Gigs";
import Add from "./pages/addGigs/Add";
import MyGigs from "./pages/myGigs/myGigs";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Outlet />
      <Footer />
    </QueryClientProvider>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/gigs", element: <Gigs /> },
        { path: "/add", element: <Add /> },
        { path: "/gig/:id", element: <Gig /> },
        { path: "/orders", element: <Orders /> },
        { path: "/mygigs", element: <MyGigs /> },
        { path: "/messages", element: <Messages /> },
        { path: "/message/:id", element: <Message /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/pay/:id", element: <Pay /> },
        { path: "/success", element: <Success /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
