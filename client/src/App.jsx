import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ForgotPasswordPage
from "./pages/ForgotPasswordPage";
import ResetPasswordPage 
from "./pages/ResetPasswordPage";

import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
  path="/"
  element={<LoginPage />}
/>

<Route
  path="/login"
  element={<LoginPage />}
/>

<Route
  path="/register"
  element={<RegisterPage />}
/>

<Route
  path="/todo"
  element={<TodoPage />}
/>

<Route
  path="/forgot-password"
  element={<ForgotPasswordPage />}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPasswordPage />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;