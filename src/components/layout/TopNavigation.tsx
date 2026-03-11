import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "components";
import { netflixTheme, lightTheme } from "../../theme/colors";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../hooks/useFavorites";
import { SEARCH_TYPES } from "../../constants";

declare global {
  interface Window {
    electronAPI?: {
      windowMinimize: () => void;
      windowResize: () => void;
      windowClose: () => void;
    };
  }
}

const useStyles = makeStyles(() => ({
  topNav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "70px",
    background: netflixTheme.background.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 48px",
    zIndex: 1000,
    boxShadow: "0 1px 0 var(--border-light)",
    transition: "background 0.3s ease, box-shadow 0.3s ease",
    WebkitAppRegion: "drag",
    "@media (max-width: 960px)": {
      padding: "0 24px",
      height: "56px",
    },
    "@media (min-width: 2560px)": {
      height: "100px",
      padding: "0 72px",
    },
    "@media (min-width: 3840px)": {
      height: "140px",
      padding: "0 96px",
    },
  },
  noDrag: {
    WebkitAppRegion: "no-drag",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "48px",
    WebkitAppRegion: "no-drag",
    "@media (max-width: 960px)": {
      gap: "24px",
    },
    "@media (min-width: 2560px)": {
      gap: "64px",
    },
  },
  logo: {
    height: "32px",
    cursor: "pointer",
    "@media (max-width: 960px)": {
      height: "24px",
    },
    "@media (min-width: 2560px)": {
      height: "48px",
    },
    "@media (min-width: 3840px)": {
      height: "64px",
    },
  },
  navMenu: {
    display: "flex",
    gap: "32px",
    listStyle: "none",
    margin: 0,
    padding: 0,
    "@media (max-width: 960px)": {
      gap: "16px",
    },
    "@media (max-width: 850px)": {
      gap: "12px",
    },
    "@media (min-width: 2560px)": {
      gap: "48px",
    },
  },
  navLink: {
    color: netflixTheme.text.secondary,
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 400,
    transition: "color 0.3s ease",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    "&:hover": {
      color: netflixTheme.text.primary,
    },
    "&.active": {
      color: netflixTheme.text.primary,
      fontWeight: 500,
    },
    "@media (max-width: 960px)": {
      fontSize: "12px",
      gap: "4px",
    },
    "@media (min-width: 2560px)": {
      fontSize: "18px",
      gap: "8px",
    },
    "@media (min-width: 3840px)": {
      fontSize: "24px",
      gap: "10px",
    },
  },
  navBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "18px",
    height: "18px",
    padding: "0 5px",
    borderRadius: "9px",
    backgroundColor: netflixTheme.accent,
    color: "#fff",
    fontSize: "11px",
    fontWeight: 600,
    lineHeight: 1,
    "@media (max-width: 960px)": {
      minWidth: "16px",
      height: "16px",
      fontSize: "10px",
      padding: "0 4px",
    },
    "@media (min-width: 2560px)": {
      minWidth: "22px",
      height: "22px",
      fontSize: "13px",
      padding: "0 6px",
    },
    "@media (min-width: 3840px)": {
      minWidth: "28px",
      height: "28px",
      fontSize: "16px",
      padding: "0 8px",
    },
  },
  navIcon: {
    width: "18px",
    height: "18px",
    opacity: 0.8,
    "@media (max-width: 960px)": {
      width: "14px",
      height: "14px",
    },
    "@media (min-width: 2560px)": {
      width: "24px",
      height: "24px",
    },
    "@media (min-width: 3840px)": {
      width: "30px",
      height: "30px",
    },
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    WebkitAppRegion: "no-drag",
    "@media (max-width: 960px)": {
      gap: "16px",
    },
    "@media (min-width: 2560px)": {
      gap: "32px",
    },
  },
  iconButton: {
    width: "24px",
    height: "24px",
    cursor: "pointer",
    opacity: 0.8,
    transition: "opacity 0.3s ease",
    "&:hover": {
      opacity: 1,
    },
  },
  searchWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
    flexShrink: 0,
    zIndex: 2,
    transition: "color 0.3s ease",
    "@media (min-width: 2560px)": {
      width: "28px",
      height: "28px",
    },
    "@media (min-width: 3840px)": {
      width: "36px",
      height: "36px",
    },
  },
  searchInputWrapper: {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    maxWidth: 0,
    opacity: 0,
    transition:
      "max-width 0.4s ease, opacity 0.3s ease, border-color 0.3s ease",
    borderRadius: "4px",
    border: "1px solid transparent",
    backgroundColor: "transparent",
  },
  searchInputOpen: {
    maxWidth: "400px",
    opacity: 1,
    border: `1px solid ${netflixTheme.text.secondary}`,
    backgroundColor: "var(--bg-card)",
    marginLeft: "8px",
    "@media (max-width: 960px)": {
      maxWidth: "280px",
    },
    "@media (min-width: 2560px)": {
      maxWidth: "500px",
    },
    "@media (min-width: 3840px)": {
      maxWidth: "650px",
    },
  },
  searchTypeSelect: {
    height: "34px",
    padding: "0 8px",
    border: "none",
    borderRight: `1px solid ${netflixTheme.border.light}`,
    outline: "none",
    backgroundColor: "transparent",
    color: netflixTheme.accent,
    fontSize: "12px",
    fontWeight: 600,
    fontFamily: "'Roboto', sans-serif",
    cursor: "pointer",
    flexShrink: 0,
    "& option": {
      backgroundColor: netflixTheme.background.main,
      color: netflixTheme.text.primary,
    },
    "@media (max-width: 960px)": {
      fontSize: "11px",
      padding: "0 4px",
    },
    "@media (min-width: 2560px)": {
      height: "44px",
      fontSize: "16px",
      padding: "0 12px",
    },
    "@media (min-width: 3840px)": {
      height: "56px",
      fontSize: "20px",
      padding: "0 16px",
    },
  },
  searchInput: {
    width: "200px",
    height: "34px",
    padding: "0 12px",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: netflixTheme.text.primary,
    fontSize: "14px",
    fontFamily: "'Roboto', sans-serif",
    MozAppearance: "textfield",
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&::placeholder": {
      color: netflixTheme.text.secondary,
    },
    "@media (max-width: 960px)": {
      width: "130px",
      fontSize: "12px",
    },
    "@media (min-width: 2560px)": {
      width: "280px",
      height: "44px",
      fontSize: "18px",
    },
    "@media (min-width: 3840px)": {
      width: "380px",
      height: "56px",
      fontSize: "22px",
    },
  },
  searchSubmit: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px",
    height: "34px",
    border: "none",
    borderLeft: `1px solid ${netflixTheme.border.light}`,
    backgroundColor: "transparent",
    color: netflixTheme.text.secondary,
    cursor: "pointer",
    flexShrink: 0,
    transition: "color 0.2s ease, background-color 0.2s ease",
    "&:hover": {
      color: netflixTheme.text.primary,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    "& svg": {
      width: "16px",
      height: "16px",
    },
    "@media (min-width: 2560px)": {
      width: "44px",
      height: "44px",
      "& svg": {
        width: "22px",
        height: "22px",
      },
    },
    "@media (min-width: 3840px)": {
      width: "56px",
      height: "56px",
      "& svg": {
        width: "28px",
        height: "28px",
      },
    },
  },
  profileWrapper: {
    position: "relative",
  },
  profileIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "4px",
    background: netflixTheme.accent,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: netflixTheme.text.primary,
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
    "@media (min-width: 2560px)": {
      width: "44px",
      height: "44px",
      fontSize: "18px",
    },
    "@media (min-width: 3840px)": {
      width: "56px",
      height: "56px",
      fontSize: "24px",
    },
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: 0,
    minWidth: "200px",
    backgroundColor: "var(--bg-card)",
    border: "1px solid var(--border-main)",
    borderRadius: "4px",
    padding: "8px 0",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
    zIndex: 1001,
    "@media (min-width: 2560px)": {
      minWidth: "280px",
      padding: "12px 0",
    },
    "@media (min-width: 3840px)": {
      minWidth: "360px",
      padding: "16px 0",
    },
  },
  dropdownHeader: {
    padding: "12px 16px",
    borderBottom: "1px solid var(--border-light)",
    marginBottom: "4px",
  },
  dropdownName: {
    fontSize: "14px",
    fontWeight: 600,
    color: netflixTheme.text.primary,
    marginBottom: "2px",
    "@media (min-width: 2560px)": {
      fontSize: "18px",
    },
    "@media (min-width: 3840px)": {
      fontSize: "22px",
    },
  },
  dropdownEmail: {
    fontSize: "12px",
    color: netflixTheme.text.secondary,
    "@media (min-width: 2560px)": {
      fontSize: "15px",
    },
    "@media (min-width: 3840px)": {
      fontSize: "18px",
    },
  },
  dropdownItem: {
    display: "block",
    width: "100%",
    padding: "10px 16px",
    fontSize: "14px",
    color: netflixTheme.text.secondary,
    textDecoration: "none",
    border: "none",
    background: "none",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.15s ease",
    "&:hover": {
      backgroundColor: "var(--card-hover)",
      color: "var(--text-primary)",
    },
  },
  divider: {
    height: "1px",
    backgroundColor: "var(--border-light)",
    margin: "4px 0",
  },
  themeToggle: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "none",
    background: "var(--card-hover)",
    color: "var(--text-primary)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s ease",
    "&:hover": {
      opacity: 0.8,
    },
    "& svg": {
      width: "20px",
      height: "20px",
    },
    "@media (min-width: 2560px)": {
      width: "48px",
      height: "48px",
      "& svg": {
        width: "26px",
        height: "26px",
      },
    },
    "@media (min-width: 3840px)": {
      width: "60px",
      height: "60px",
      "& svg": {
        width: "32px",
        height: "32px",
      },
    },
  },
  windowControls: {
    display: "flex",
    gap: "16px",
    marginLeft: "24px",
    "@media (min-width: 2560px)": {
      gap: "20px",
      marginLeft: "32px",
    },
  },
  controlButton: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "opacity 0.3s ease",
    border: "none",
    "&:hover": {
      opacity: 0.7,
    },
    "@media (min-width: 2560px)": {
      width: "16px",
      height: "16px",
    },
    "@media (min-width: 3840px)": {
      width: "20px",
      height: "20px",
    },
  },
  minimizeBtn: {
    background: "#FBC638",
  },
  resizeBtn: {
    background: "#39E84D",
  },
  closeBtn: {
    background: "#FE5F57",
  },
}));

interface TopNavigationProps {
  darkTheme?: boolean;
  onToggleTheme?: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ darkTheme = true, onToggleTheme }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState(SEARCH_TYPES.TITLE);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        if (searchQuery === "") {
          setSearchOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchQuery]);

  const doSearch = () => {
    if (searchQuery.trim()) {
      navigate(
        `/search?q=${encodeURIComponent(searchQuery.trim())}&type=${searchType}`,
      );
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const handleSearchIconClick = () => {
    if (!searchOpen) {
      setSearchOpen(true);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      doSearch();
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      doSearch();
    } else if (e.key === "Escape") {
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const getSearchPlaceholder = () => {
    switch (searchType) {
      case SEARCH_TYPES.TITLE:
        return "Movie title...";
      case SEARCH_TYPES.GENRE:
        return "Movie genre...";
      case SEARCH_TYPES.YEAR:
        return "Movie year...";
      default:
        return "Search...";
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate("/login");
  };

  const handleMinimize = () => window.electronAPI?.windowMinimize();
  const handleResize = () => window.electronAPI?.windowResize();
  const handleClose = () => window.electronAPI?.windowClose();

  const navItems = [
    { path: "/home", text: "Home", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
    )},
    { path: "/trending", text: "Trending", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
    )},
    { path: "/coming", text: "Coming Soon", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
    )},
    { path: "/favorites", text: "My List", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    )},
    { path: "/settings", text: "Settings", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
    )},
  ];

  const handleDoubleClick = () => {
    window.electronAPI?.windowResize();
  };

  return (
    <div className={classes.topNav} onDoubleClick={handleDoubleClick}>
      <div className={classes.leftSection}>
        <NavLink to="/home">
          <Image.AppLogo className={classes.logo} />
        </NavLink>
        <ul className={classes.navMenu}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} className={classes.navLink}>
                <span className={classes.navIcon}>{item.icon}</span>
                {item.text}
                {item.path === "/favorites" && favorites.length > 0 && (
                  <span className={classes.navBadge}>{favorites.length}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className={classes.rightSection}>
        <div className={classes.searchWrapper} ref={searchRef}>
          <svg
            className={classes.searchIcon}
            onClick={handleSearchIconClick}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <div
            className={`${classes.searchInputWrapper} ${searchOpen ? classes.searchInputOpen : ""}`}
          >
            <select
              className={classes.searchTypeSelect}
              value={searchType}
              onChange={(e) => { setSearchType(e.target.value); setSearchQuery(""); }}
            >
              <option value={SEARCH_TYPES.TITLE}>Title</option>
              <option value={SEARCH_TYPES.GENRE}>Genre</option>
              <option value={SEARCH_TYPES.YEAR}>Year</option>
            </select>
            <input
              ref={searchInputRef}
              className={classes.searchInput}
              type={searchType === SEARCH_TYPES.YEAR ? "number" : "text"}
              placeholder={getSearchPlaceholder()}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button
              className={classes.searchSubmit}
              onClick={handleSearchIconClick}
              title="Search"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>

        {onToggleTheme && (
          <button
            className={classes.themeToggle}
            onClick={onToggleTheme}
            title={darkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkTheme ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.37 5.51A7.35 7.35 0 009.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0112 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
              </svg>
            )}
          </button>
        )}

        <div className={classes.profileWrapper} ref={dropdownRef}>
          <div
            className={classes.profileIcon}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {user?.avatarImage ? (
              <img
                src={user.avatarImage}
                alt="Avatar"
                className={classes.profileImage}
              />
            ) : (
              user?.avatar || "U"
            )}
          </div>

          {dropdownOpen && (
            <div className={classes.dropdown}>
              <div className={classes.dropdownHeader}>
                <div className={classes.dropdownName}>
                  {user?.name || "User"}
                </div>
                <div className={classes.dropdownEmail}>{user?.email || ""}</div>
              </div>
              <NavLink
                to="/account"
                className={classes.dropdownItem}
                onClick={() => setDropdownOpen(false)}
              >
                Account
              </NavLink>
              <NavLink
                to="/favorites"
                className={classes.dropdownItem}
                onClick={() => setDropdownOpen(false)}
              >
                My List
              </NavLink>
              <NavLink
                to="/settings"
                className={classes.dropdownItem}
                onClick={() => setDropdownOpen(false)}
              >
                Settings
              </NavLink>
              <div className={classes.divider} />
              <button className={classes.dropdownItem} onClick={handleLogout}>
                Sign out
              </button>
            </div>
          )}
        </div>

        <div className={classes.windowControls}>
          <button
            className={`${classes.controlButton} ${classes.minimizeBtn}`}
            onClick={handleMinimize}
            aria-label="Minimize"
          />
          <button
            className={`${classes.controlButton} ${classes.resizeBtn}`}
            onClick={handleResize}
            aria-label="Resize"
          />
          <button
            className={`${classes.controlButton} ${classes.closeBtn}`}
            onClick={handleClose}
            aria-label="Close"
          />
        </div>
      </div>
    </div>
  );
};

