import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from "components";
import { Favorites, Trending, Coming, Settings, Search, Auth, Account } from "components";
import { TopNavigation } from "./components/layout/TopNavigation";
import { MovieModal, Toast } from "components";
import { AuthProvider, useAuth } from "./hooks/useAuth";

import { makeStyles } from "@material-ui/styles";
import { ROUTES } from "components/routes";

const useStyles = makeStyles({
  mainApp: {
    fontFamily: "Roboto, sans-serif",
    width: "100%",
    minHeight: "100vh",
    WebkitUserSelect: "none",
    transition: "background 0.3s ease, color 0.3s ease",
    background: "var(--bg-main)",
    borderRadius: "12px",
    overflow: "hidden",
  },
  content: {
    width: "100%",
    minHeight: "100vh",
    paddingTop: "70px",
    '@media (max-width: 960px)': {
      paddingTop: "56px",
    },
    '@media (min-width: 2560px)': {
      paddingTop: "100px",
    },
    '@media (min-width: 3840px)': {
      paddingTop: "140px",
    },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function AppContent() {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [darkTheme, setDarkTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved !== "light";
  });

  const handleToggleTheme = () => {
    setDarkTheme((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  // Set CSS custom properties on <html> for global theme
  useEffect(() => {
    const root = document.documentElement;
    if (darkTheme) {
      root.style.setProperty("--bg-main", "#141414");
      root.style.setProperty("--bg-secondary", "#181818");
      root.style.setProperty("--bg-card", "#2F2F2F");
      root.style.setProperty("--bg-overlay", "rgba(0,0,0,0.7)");
      root.style.setProperty("--text-primary", "#FFFFFF");
      root.style.setProperty("--text-secondary", "#D2D2D2");
      root.style.setProperty("--text-disabled", "#808080");
      root.style.setProperty("--border-light", "rgba(255,255,255,0.1)");
      root.style.setProperty("--border-main", "rgba(255,255,255,0.2)");
      root.style.setProperty("--accent", "#E50914");
      root.style.setProperty("--nav-bg", "#141414");
      root.style.setProperty("--card-hover", "rgba(255,255,255,0.15)");
      root.style.setProperty("--scrollbar-thumb", "#3a3a3a");
      root.style.setProperty("--scrollbar-hover", "#4a4a4a");
    } else {
      root.style.setProperty("--bg-main", "#FFFFFF");
      root.style.setProperty("--bg-secondary", "#F5F5F5");
      root.style.setProperty("--bg-card", "#F0F0F0");
      root.style.setProperty("--bg-overlay", "rgba(0,0,0,0.5)");
      root.style.setProperty("--text-primary", "#212121");
      root.style.setProperty("--text-secondary", "#616161");
      root.style.setProperty("--text-disabled", "#9E9E9E");
      root.style.setProperty("--border-light", "#E0E0E0");
      root.style.setProperty("--border-main", "#BDBDBD");
      root.style.setProperty("--accent", "#E50914");
      root.style.setProperty("--nav-bg", "#FFFFFF");
      root.style.setProperty("--card-hover", "rgba(0,0,0,0.08)");
      root.style.setProperty("--scrollbar-thumb", "#C0C0C0");
      root.style.setProperty("--scrollbar-hover", "#A0A0A0");
    }
    root.style.setProperty("color", darkTheme ? "#FFFFFF" : "#212121");
  }, [darkTheme]);

  const handleMovieClick = (movie: any) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={classes.mainApp}>
      {isAuthenticated && <TopNavigation darkTheme={darkTheme} onToggleTheme={handleToggleTheme} />}
      <div className={classes.content} style={!isAuthenticated ? { paddingTop: 0 } : undefined}>
        <Routes>
          <Route path={ROUTES.LOGIN.path} element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Auth />
          } />
          <Route path={ROUTES.HOME.path} element={
            <ProtectedRoute><Home darkTheme={darkTheme} onMovieClick={handleMovieClick} /></ProtectedRoute>
          } />
          <Route path={ROUTES.SEARCH.path} element={
            <ProtectedRoute><Search darkTheme={darkTheme} onMovieClick={handleMovieClick} /></ProtectedRoute>
          } />
          <Route path={ROUTES.FAVORITES.path} element={
            <ProtectedRoute><Favorites darkTheme={darkTheme} onMovieClick={handleMovieClick} /></ProtectedRoute>
          } />
          <Route path={ROUTES.TRENDING.path} element={
            <ProtectedRoute><Trending darkTheme={darkTheme} onMovieClick={handleMovieClick} /></ProtectedRoute>
          } />
          <Route path={ROUTES.SOON.path} element={
            <ProtectedRoute><Coming darkTheme={darkTheme} onMovieClick={handleMovieClick} /></ProtectedRoute>
          } />
          <Route path={ROUTES.SETTINGS.path} element={
            <ProtectedRoute><Settings darkTheme={darkTheme} /></ProtectedRoute>
          } />
          <Route path={ROUTES.ACCOUNT.path} element={
            <ProtectedRoute><Account /></ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
        </Routes>
      </div>
      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      <Toast />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
