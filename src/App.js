import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Users = React.lazy(() => import("./user/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const AuthForm = React.lazy(() => import("./user/pages/AuthForm"));

function App() {
  const { token, login, logout, userId } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            <Routes>
              {token ? (
                <>
                  <Route path="/" element={<Users />} />
                  <Route path="/:userId/places" element={<UserPlaces />} />
                  <Route path="/places/new" element={<NewPlace />} />
                  <Route path="/places/:placeId" element={<UpdatePlace />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Users />} />
                  <Route path="/:userId/places" element={<UserPlaces />} />
                  <Route path="/auth" element={<AuthForm />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}
            </Routes>
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
