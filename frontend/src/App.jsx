import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
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
    element: <Companies />,
  },
  {
    path: "/admin/companies/create",
    element: <CompanyCreate />,
  },
  {
    path: "/admn/companies/:id",
    element: <CompanyInfo />,
  },
  {
    path: "/admin/company/:id/edit",
    element: <CompanyEdit />,
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />,
  },
  {
    path: "/admin/job/create",
    element: <AdminJobCreate />,
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
