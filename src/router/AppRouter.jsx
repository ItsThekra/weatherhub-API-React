import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import LoginPage from "../pages/LoginPage";  
import SignUpPage from "../pages/SignUpPage"; 
import WeatherPage from "../pages/WeatherPage";  
import Navbar from "../components/Navbar";  
import Footer from "../components/Footer";  

function Layout() {
  return (
    <div>
      <Navbar />  
      <div className="min-h-screen">
        <Outlet />  
      </div>
      <Footer />  
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,  
    children: [
      { path: "/", element: <LoginPage /> },  
      { path: "signup", element: <SignUpPage /> },  
      { path: "weather", element: <WeatherPage /> },  
    ],
  },
]);

function AppRouter() {
  return (
    <RouterProvider router={router} />  
  );
}

export default AppRouter;
