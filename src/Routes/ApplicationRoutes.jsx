import React from "react";
import { useUser } from "../contexts/UserContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Authentication from "../pages/Authentication/Authentication";
import Layout from "../Components/Layout/Layout";
import { Toaster } from "react-hot-toast";

const RoutesWrapper = () => {
  const { user } = useUser();

  return (
    <>
      <Toaster />

      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/auth" element={<Authentication />} />
            <Route path="/" element={<Navigate to="/auth" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};

const ApplicationRoutes = () => {
  const { user } = useUser();

  if (user) {
    return (
      <Layout>
        <RoutesWrapper />
      </Layout>
    );
  }

  return <RoutesWrapper />;
};
export default ApplicationRoutes;
