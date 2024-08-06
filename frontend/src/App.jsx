import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanyInfo from "./components/admin/CompanyInfo";
import CompanyEdit from "./components/admin/CompanyEdit";
import AdminJobs from "./components/admin/AdminJobs";
import AdminJobCreate from "./components/admin/AdminJobCreate";
import AdminJobEdit from "./components/admin/AdminJobEdit";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const appRoute = createBrowserRouter([
  // User Routes
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/jobs/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  // Admin Routes
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admn/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanyInfo />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/company/:id/edit",
    element: (
      <ProtectedRoute>
        <CompanyEdit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/job/create",
    element: (
      <ProtectedRoute>
        <AdminJobCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/job/:id/edit",
    element: (
      <ProtectedRoute>
        <AdminJobEdit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/job/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRoute} />
    </>
  );
}

export default App;
