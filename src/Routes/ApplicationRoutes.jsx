import React from "react";
import { useUser } from "../contexts/UserContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Authentication from "../pages/Authentication/Authentication";
import Layout from "../Components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import Goals from "../pages/Goals/Goals";
import AddToGoal from "../pages/Goals/AddToGoal";
import EditGoal from "../pages/Goals/EditGoal";
import Calendar from "../pages/Calendar/Calendar";
import Diet from "../pages/Diet/Diet";

const RoutesWrapper = () => {
  const { user } = useUser();

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "#181818",
            color: "#fff",
          },
        }}
      />

      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/goals/:type/add" element={<AddToGoal />} />
            <Route path="/goals/:type/edit" element={<EditGoal />} />
            <Route path="/auth" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/auth" element={<Authentication />} />
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/goals" element={<Navigate to="/auth" replace />} />
            <Route
              path="/goals/:type/add"
              element={<Navigate to="/auth" replace />}
            />
            <Route
              path="/goals/:type/edit"
              element={<Navigate to="/auth" replace />}
            />
            <Route path="/calendar" element={<Navigate to="/auth" replace />} />
            <Route path="/diet" element={<Navigate to="/auth" replace />} />
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
