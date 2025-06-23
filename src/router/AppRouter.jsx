import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import LoginPage from "../pages/LoginPage";  
import SignUpPage from "../pages/SignUpPage"; 
import WeatherPage from "../pages/WeatherPage";  
import Navbar from "../components/Navbar";  
import Footer from "../components/Footer";  

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> 
      <div className="flex-grow">
        <Outlet />  
      </div>
      <Footer className="flex flex-col max-h-screen"/> 
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
