import "@/App.css";
import LoginPage from "@/components/LoginPage";
import HomePage from "@/components/HomePage";
import SignUpPage from "@/components/SignUpPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "login",
    Component: LoginPage,
  },
  {
    path: "signup",
    Component: SignUpPage,
  },
  {
    path: "*",
    Component: () => <p>404 Not Found</p>,
  }
  // TODO logout
]);

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

export default App;
