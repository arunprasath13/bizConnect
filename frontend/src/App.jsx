import { useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import SignUpPage from "./pages/auth/SignUpPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import Homepage from "./pages/Homepage.jsx";
import {Toaster} from "react-hot-toast"
import { axiosInstance } from "./lib/axios.js";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
function App() {
  const {data:authUser,isLoading} = useQuery({queryKey:["authUser"]

    ,queryFn:async() => {
      try{
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      }catch(error){
        if(error.response && error.response.status === 401){
          return null;
        }
        toast.error("Something went wrong")
      }
    }
  });
  console.log("AuthUser: ",authUser)

  return (
    <Layout>
      <Routes>
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"}/>} />
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to={"/login"}/>} />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
