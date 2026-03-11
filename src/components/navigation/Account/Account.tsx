import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { netflixTheme } from "../../../theme/colors";
import { useAuth } from "../../../hooks/useAuth";
import { useFavorites } from "../../../hooks/useFavorites";

const useStyles = makeStyles({
  page: {
    position: "relative",
    paddingTop: "24px",
    minHeight: "100vh",
  },
  header: {
    padding: "48px 48px 24px",
    borderBottom: `1px solid ${netflixTheme.border.light}`,
    marginBottom: 32,
    '@media (max-width: 960px)': {
      padding: "32px 24px 16px",
      marginBottom: 24,
    },
    '@media (min-width: 2560px)': {
      padding: "64px 72px 32px",
      marginBottom: 44,
    },
    '@media (min-width: 3840px)': {
      padding: "80px 96px 40px",
      marginBottom: 56,
    },
  },
  title: {
    fontSize: 48,
    fontWeight: 700,
    color: netflixTheme.text.primary,
    marginBottom: 8,
    '@media (max-width: 960px)': {
      fontSize: 32,
    },
    '@media (min-width: 2560px)': {
      fontSize: 64,
    },
    '@media (min-width: 3840px)': {
      fontSize: 84,
    },
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 400,
    color: netflixTheme.text.secondary,
    '@media (max-width: 960px)': {
      fontSize: 14,
    },
    '@media (min-width: 2560px)': {
      fontSize: 24,
    },
    '@media (min-width: 3840px)': {
      fontSize: 32,
    },
  },
  content: {
    padding: "0 48px 48px",
    maxWidth: 800,
    '@media (max-width: 960px)': {
      padding: "0 24px 32px",
    },
    '@media (min-width: 2560px)': {
      padding: "0 72px 64px",
      maxWidth: 1100,
    },
    '@media (min-width: 3840px)': {
      padding: "0 96px 80px",
      maxWidth: 1500,
    },
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 600,
    color: netflixTheme.text.primary,
    marginBottom: 20,
    '@media (min-width: 2560px)': {
      fontSize: 30,
      marginBottom: 28,
    },
    '@media (min-width: 3840px)': {
      fontSize: 40,
      marginBottom: 36,
    },
  },
  avatarWrapper: {
    position: "relative",
    width: 80,
    height: 80,
    marginBottom: 24,
    cursor: "pointer",
    "&:hover $avatarOverlay": {
      opacity: 1,
    },
    '@media (min-width: 2560px)': {
      width: 110,
      height: 110,
      marginBottom: 32,
    },
    '@media (min-width: 3840px)': {
      width: 150,
      height: 150,
      marginBottom: 40,
    },
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: "8px",
    backgroundColor: netflixTheme.accent,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 36,
    fontWeight: 700,
    color: "#fff",
    overflow: "hidden",
    '@media (min-width: 2560px)': {
      width: 110,
      height: 110,
      fontSize: 48,
    },
    '@media (min-width: 3840px)': {
      width: 150,
      height: 150,
      fontSize: 64,
    },
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  avatarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s ease",
  },
  avatarOverlayIcon: {
    width: 24,
    height: 24,
    fill: "#fff",
  },
  hiddenInput: {
    display: "none",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "160px 1fr",
    gap: "16px 24px",
    alignItems: "center",
    '@media (max-width: 960px)': {
      gridTemplateColumns: "120px 1fr",
      gap: "12px 16px",
    },
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: netflixTheme.text.secondary,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    '@media (min-width: 2560px)': {
      fontSize: 18,
    },
    '@media (min-width: 3840px)': {
      fontSize: 24,
    },
  },
  value: {
    fontSize: 16,
    color: netflixTheme.text.primary,
    '@media (min-width: 2560px)': {
      fontSize: 22,
    },
    '@media (min-width: 3840px)': {
      fontSize: 28,
    },
  },
  input: {
    width: "100%",
    height: 44,
    padding: "10px 16px",
    borderRadius: "4px",
    border: `1px solid ${netflixTheme.border.main}`,
    backgroundColor: netflixTheme.background.card,
    color: netflixTheme.text.primary,
    fontSize: 16,
    outline: "none",
    boxSizing: "border-box",
    "&:focus": {
      borderColor: netflixTheme.accent,
    },
    '@media (min-width: 2560px)': {
      height: 56,
      fontSize: 22,
      padding: "12px 20px",
    },
    '@media (min-width: 3840px)': {
      height: 72,
      fontSize: 28,
      padding: "16px 24px",
    },
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    '@media (max-width: 960px)': {
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "12px",
    },
  },
  statCard: {
    padding: "24px",
    borderRadius: "8px",
    backgroundColor: netflixTheme.background.card,
    textAlign: "center",
    '@media (min-width: 2560px)': {
      padding: "36px",
    },
    '@media (min-width: 3840px)': {
      padding: "48px",
    },
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 700,
    color: netflixTheme.accent,
    marginBottom: 8,
    '@media (min-width: 2560px)': {
      fontSize: 48,
    },
    '@media (min-width: 3840px)': {
      fontSize: 64,
    },
  },
  statLabel: {
    fontSize: 14,
    color: netflixTheme.text.secondary,
    '@media (min-width: 2560px)': {
      fontSize: 18,
    },
    '@media (min-width: 3840px)': {
      fontSize: 24,
    },
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: 24,
  },
  btn: {
    padding: "12px 24px",
    borderRadius: "4px",
    border: "none",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    '@media (min-width: 2560px)': {
      padding: "16px 32px",
      fontSize: 18,
    },
    '@media (min-width: 3840px)': {
      padding: "20px 40px",
      fontSize: 24,
    },
  },
  btnPrimary: {
    backgroundColor: netflixTheme.accent,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#f40612",
    },
  },
  btnSecondary: {
    backgroundColor: netflixTheme.background.card,
    color: netflixTheme.text.primary,
    "&:hover": {
      backgroundColor: "var(--card-hover)",
    },
  },
  btnDanger: {
    backgroundColor: "transparent",
    color: "#E87C03",
    border: "1px solid #E87C03",
    "&:hover": {
      backgroundColor: "rgba(232, 124, 3, 0.1)",
    },
  },
  message: {
    padding: "12px 16px",
    borderRadius: "4px",
    fontSize: 14,
    marginBottom: 16,
    backgroundColor: "rgba(70, 211, 105, 0.15)",
    color: "#46D369",
  },
  removeAvatarBtn: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: netflixTheme.background.main,
    border: `1px solid ${netflixTheme.border.main}`,
    color: netflixTheme.text.secondary,
    fontSize: 12,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    "&:hover": {
      backgroundColor: "#E53935",
      color: "#fff",
      borderColor: "#E53935",
    },
  },
});

export const Account = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const { favorites } = useFavorites();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");

  if (!user) return null;

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Image must be smaller than 2MB");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        updateProfile({ avatarImage: dataUrl });
        setMessage("Avatar updated");
        setTimeout(() => setMessage(""), 3000);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const handleRemoveAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateProfile({ avatarImage: null });
    setMessage("Avatar removed");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSave = () => {
    if (!editName.trim() || !editEmail.trim()) return;
    updateProfile({
      name: editName.trim(),
      email: editEmail.trim(),
      avatar: editName.trim().charAt(0).toUpperCase(),
    });
    setEditing(false);
    setMessage("Profile updated successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCancel = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={classes.page}>
      <div className={classes.header}>
        <h1 className={classes.title}>Account</h1>
        <p className={classes.subtitle}>Manage your profile and preferences</p>
      </div>
      <div className={classes.content}>
        {message && <div className={classes.message}>{message}</div>}

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>Profile</h2>

          <div className={classes.avatarWrapper} onClick={handleAvatarClick}>
            <div className={classes.avatar}>
              {user.avatarImage ? (
                <img
                  src={user.avatarImage}
                  alt="Avatar"
                  className={classes.avatarImage}
                />
              ) : (
                user.avatar || "U"
              )}
            </div>
            <div className={classes.avatarOverlay}>
              <svg className={classes.avatarOverlayIcon} viewBox="0 0 24 24">
                <path d="M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z" />
              </svg>
            </div>
            {user.avatarImage && (
              <button
                className={classes.removeAvatarBtn}
                onClick={handleRemoveAvatar}
                title="Remove avatar"
              >
                x
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            className={classes.hiddenInput}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          {editing ? (
            <>
              <div className={classes.infoGrid}>
                <span className={classes.label}>Name</span>
                <input
                  className={classes.input}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <span className={classes.label}>Email</span>
                <input
                  className={classes.input}
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>
              <div className={classes.actions}>
                <button
                  className={`${classes.btn} ${classes.btnPrimary}`}
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button
                  className={`${classes.btn} ${classes.btnSecondary}`}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={classes.infoGrid}>
                <span className={classes.label}>Name</span>
                <span className={classes.value}>{user.name}</span>
                <span className={classes.label}>Email</span>
                <span className={classes.value}>{user.email}</span>
                <span className={classes.label}>Member since</span>
                <span className={classes.value}>{memberSince}</span>
              </div>
              <div className={classes.actions}>
                <button
                  className={`${classes.btn} ${classes.btnSecondary}`}
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>Statistics</h2>
          <div className={classes.statsGrid}>
            <div className={classes.statCard}>
              <div className={classes.statNumber}>{favorites.length}</div>
              <div className={classes.statLabel}>In My List</div>
            </div>
            <div className={classes.statCard}>
              <div className={classes.statNumber}>{memberSince.split(" ")[0] === "Unknown" ? "0" : "1"}</div>
              <div className={classes.statLabel}>Profile</div>
            </div>
            <div className={classes.statCard}>
              <div className={classes.statNumber}>
                {user.avatar || "U"}
              </div>
              <div className={classes.statLabel}>Avatar</div>
            </div>
          </div>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>Account Actions</h2>
          <div className={classes.actions}>
            <button
              className={`${classes.btn} ${classes.btnDanger}`}
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
