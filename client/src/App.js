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
import Layout from "./pages/Layout";
import { Page404 } from "./pages/Page404";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/Register"));
const HomePage = lazy(() => import("./pages/Home"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const PrivateChat = lazy(() => import("./pages/PrivateChat"));
const RoomsPage = lazy(() => import("./pages/Rooms"));

function App() {
  return (
    <Router>
      <ToastContainer />
      <AuthProvider>
        <Layout>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route element={<Public />}>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>
              <Route element={<Private />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/private-chat/:userId" element={<PrivateChat />} />
                <Route path="/room-chat/:roomId" element={<RoomsPage />} />
              </Route>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
