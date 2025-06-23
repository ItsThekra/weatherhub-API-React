import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import LoginPage from "../Page/LoginPage";  
import SignUpPage from "../Page/SignUpPage"; 
import WeatherPage from "../Page/WeatherPage";  
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
