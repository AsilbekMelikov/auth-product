import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/auth/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import NotFound from "./pages/NotFound";
import AddedProducts from "./pages/AddedProducts";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

function App() {
  const location = useLocation().pathname;
  return (
    <div className="bg-background">
      {location === "/auth/login" ? "" : <Navbar />}
      <main>
        <section
          className={`flex min-h-[66vh] flex-1 flex-col px-6 pb-6 ${
            location === "/auth/login" ? "" : "pt-36"
          } max-md:pb-14 sm:px-14`}
        >
          <div className="mx-auto w-full max-w-5xl">
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
                path="/"
              />
              <Route
                element={
                  <ProtectedRoute>
                    <AddedProducts />
                  </ProtectedRoute>
                }
                path="/added-products"
              />
              <Route element={<LoginPage />} path="auth/login" />
              <Route
                element={
                  <ProtectedRoute>
                    <NotFound />
                  </ProtectedRoute>
                }
                path="*"
              />
            </Routes>
          </div>
        </section>
      </main>
      {location === "/auth/login" ? "" : <Footer />}
    </div>
  );
}

export default App;
