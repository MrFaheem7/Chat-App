import "./App.css";
import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "./utils/Spinner";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import Public from "./routes/Public";
import Private from "./routes/Private";
import PublicLayout from "./pages/PublicLayout";
import { Page404 } from "./pages/Page404";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/Register"));
const BroadcastPage = lazy(() => import("./pages/BroadcastPage"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

function App() {
  return (
    <Router>
      <ToastContainer />
      <AuthProvider>
        <PublicLayout>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route element={<Public />}>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>
              <Route element={<Private />}>
                <Route path="/broadcast" element={<BroadcastPage />} />
              </Route>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </PublicLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;
