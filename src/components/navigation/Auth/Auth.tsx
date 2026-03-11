import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { netflixTheme } from "../../../theme/colors";
import { useAuth } from "../../../hooks/useAuth";

const useStyles = makeStyles({
  titleBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 16px",
    zIndex: 1000,
    WebkitAppRegion: "drag",
    "@media (min-width: 2560px)": {
      height: "48px",
      padding: "0 24px",
    },
    "@media (min-width: 3840px)": {
      height: "60px",
      padding: "0 32px",
    },
  },
  windowControls: {
    display: "flex",
    gap: "12px",
    WebkitAppRegion: "no-drag",
    "@media (min-width: 2560px)": {
      gap: "16px",
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
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "24px",
    background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))`,
  },
  card: {
    width: "100%",
    maxWidth: "450px",
    backgroundColor: "var(--bg-card)",
    borderRadius: "8px",
    padding: "60px 68px 40px",
    boxSizing: "border-box",
    "@media (max-width: 960px)": {
      padding: "40px 32px 32px",
      maxWidth: "400px",
    },
    "@media (min-width: 2560px)": {
      maxWidth: "600px",
      padding: "80px 88px 56px",
    },
    "@media (min-width: 3840px)": {
      maxWidth: "800px",
      padding: "100px 108px 72px",
    },
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    color: netflixTheme.text.primary,
    marginBottom: 28,
    "@media (min-width: 2560px)": {
      fontSize: 44,
      marginBottom: 36,
    },
    "@media (min-width: 3840px)": {
      fontSize: 56,
      marginBottom: 44,
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 2,
  },
  input: {
    width: "100%",
    height: 50,
    padding: "16px 20px",
    borderRadius: "4px",
    border: "2px solid transparent",
    backgroundColor: "var(--bg-secondary)",
    color: netflixTheme.text.primary,
    fontSize: 16,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
    "&::placeholder": {
      color: "var(--text-disabled)",
    },
    "&:focus": {
      backgroundColor: "var(--bg-card)",
      borderColor: "var(--text-secondary)",
    },
    "@media (min-width: 2560px)": {
      height: 64,
      fontSize: 22,
      padding: "20px 24px",
    },
    "@media (min-width: 3840px)": {
      height: 80,
      fontSize: 28,
      padding: "24px 28px",
    },
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  passwordInput: {
    paddingRight: "48px",
    "@media (min-width: 2560px)": {
      paddingRight: "60px",
    },
    "@media (min-width: 3840px)": {
      paddingRight: "72px",
    },
  },
  eyeToggle: {
    position: "absolute",
    right: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    color: "var(--text-disabled)",
    transition: "color 0.2s ease",
    "&:hover": {
      color: "var(--text-primary)",
    },
    "& svg": {
      width: "20px",
      height: "20px",
    },
    "@media (min-width: 2560px)": {
      right: "16px",
      "& svg": {
        width: "26px",
        height: "26px",
      },
    },
    "@media (min-width: 3840px)": {
      right: "20px",
      "& svg": {
        width: "32px",
        height: "32px",
      },
    },
  },
  inputError: {
    borderColor: "#E87C03",
    "&:focus": {
      borderColor: "#E87C03",
    },
  },
  fieldErrorWrapper: {
    minHeight: 21,
    display: "flex",
    alignItems: "flex-start",
    "@media (min-width: 2560px)": {
      minHeight: 29,
    },
    "@media (min-width: 3840px)": {
      minHeight: 37,
    },
  },
  fieldError: {
    color: "#E87C03",
    fontSize: 13,
    marginTop: 4,
    padding: 0,
    lineHeight: 1.3,
    "@media (min-width: 2560px)": {
      fontSize: 17,
      marginTop: 6,
    },
    "@media (min-width: 3840px)": {
      fontSize: 21,
      marginTop: 8,
    },
  },
  errorBanner: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px",
    borderRadius: "4px",
    backgroundColor: "rgba(229, 9, 20, 0.12)",
    border: "1px solid rgba(229, 9, 20, 0.3)",
    marginBottom: 8,
    animation: "$slideIn 0.3s ease-out",
    "@media (min-width: 2560px)": {
      padding: "16px 20px",
      gap: "14px",
      marginBottom: 12,
    },
    "@media (min-width: 3840px)": {
      padding: "20px 24px",
      gap: "18px",
      marginBottom: 16,
    },
  },
  errorBannerIcon: {
    width: "20px",
    height: "20px",
    flexShrink: 0,
    color: "#E50914",
    "@media (min-width: 2560px)": {
      width: "26px",
      height: "26px",
    },
    "@media (min-width: 3840px)": {
      width: "32px",
      height: "32px",
    },
  },
  errorBannerText: {
    color: "#E87C03",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.4,
    "@media (min-width: 2560px)": {
      fontSize: 18,
    },
    "@media (min-width: 3840px)": {
      fontSize: 22,
    },
  },
  "@keyframes slideIn": {
    from: {
      opacity: 0,
      transform: "translateY(-8px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  button: {
    width: "100%",
    height: 50,
    marginTop: 8,
    borderRadius: "4px",
    border: "none",
    backgroundColor: netflixTheme.accent,
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 0.2s ease",
    "&:hover": {
      backgroundColor: "#f40612",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "default",
    },
    "@media (min-width: 2560px)": {
      height: 64,
      fontSize: 22,
    },
    "@media (min-width: 3840px)": {
      height: 80,
      fontSize: 28,
    },
  },
  toggle: {
    marginTop: 16,
    color: "#737373",
    fontSize: 16,
    "& span": {
      color: netflixTheme.text.primary,
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    "@media (min-width: 2560px)": {
      fontSize: 22,
      marginTop: 24,
    },
    "@media (min-width: 3840px)": {
      fontSize: 28,
      marginTop: 32,
    },
  },
  forgotLinks: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 4,
    gap: "12px",
  },
  forgotLink: {
    color: "#737373",
    fontSize: 13,
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "inherit",
    transition: "color 0.2s ease",
    "&:hover": {
      color: netflixTheme.text.primary,
      textDecoration: "underline",
    },
    "@media (min-width: 2560px)": {
      fontSize: 17,
    },
    "@media (min-width: 3840px)": {
      fontSize: 21,
    },
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    color: "#737373",
    fontSize: 14,
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "inherit",
    marginBottom: 20,
    transition: "color 0.2s ease",
    "&:hover": {
      color: netflixTheme.text.primary,
    },
    "& svg": {
      width: "16px",
      height: "16px",
    },
    "@media (min-width: 2560px)": {
      fontSize: 18,
      marginBottom: 28,
      "& svg": {
        width: "20px",
        height: "20px",
      },
    },
    "@media (min-width: 3840px)": {
      fontSize: 22,
      marginBottom: 36,
      "& svg": {
        width: "24px",
        height: "24px",
      },
    },
  },
  subtitle: {
    color: "#737373",
    fontSize: 15,
    lineHeight: 1.5,
    marginBottom: 20,
    "@media (min-width: 2560px)": {
      fontSize: 20,
      marginBottom: 28,
    },
    "@media (min-width: 3840px)": {
      fontSize: 25,
      marginBottom: 36,
    },
  },
  successBanner: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px",
    borderRadius: "4px",
    backgroundColor: "rgba(57, 232, 77, 0.12)",
    border: "1px solid rgba(57, 232, 77, 0.3)",
    marginBottom: 8,
    animation: "$slideIn 0.3s ease-out",
    "@media (min-width: 2560px)": {
      padding: "16px 20px",
      gap: "14px",
      marginBottom: 12,
    },
    "@media (min-width: 3840px)": {
      padding: "20px 24px",
      gap: "18px",
      marginBottom: 16,
    },
  },
  successBannerIcon: {
    width: "20px",
    height: "20px",
    flexShrink: 0,
    color: "#39E84D",
    "@media (min-width: 2560px)": {
      width: "26px",
      height: "26px",
    },
    "@media (min-width: 3840px)": {
      width: "32px",
      height: "32px",
    },
  },
  successBannerText: {
    color: "#39E84D",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.4,
    "@media (min-width: 2560px)": {
      fontSize: 18,
    },
    "@media (min-width: 3840px)": {
      fontSize: 22,
    },
  },
  emailResult: {
    padding: "16px",
    borderRadius: "4px",
    backgroundColor: "var(--bg-secondary)",
    marginBottom: 12,
    "@media (min-width: 2560px)": {
      padding: "20px",
      marginBottom: 16,
    },
    "@media (min-width: 3840px)": {
      padding: "24px",
      marginBottom: 20,
    },
  },
  emailResultLabel: {
    color: "#737373",
    fontSize: 12,
    marginBottom: 6,
    "@media (min-width: 2560px)": {
      fontSize: 16,
      marginBottom: 8,
    },
    "@media (min-width: 3840px)": {
      fontSize: 20,
      marginBottom: 10,
    },
  },
  emailResultValue: {
    color: netflixTheme.text.primary,
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "monospace",
    "@media (min-width: 2560px)": {
      fontSize: 22,
    },
    "@media (min-width: 3840px)": {
      fontSize: 28,
    },
  },
});

type ViewMode = "login" | "register" | "forgotPassword" | "forgotEmail";
type ResetStep = "email" | "newPassword" | "done";

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  recoveryEmail?: string;
  recoveryName?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export const Auth = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { login, register, resetPassword, findEmailByName } = useAuth();

  const [mode, setMode] = useState<ViewMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Forgot password state
  const [resetStep, setResetStep] = useState<ResetStep>("email");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Forgot email state
  const [recoveryName, setRecoveryName] = useState("");
  const [foundEmails, setFoundEmails] = useState<string[]>([]);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const clearState = () => {
    setFieldErrors({});
    setFormError("");
    setSuccessMessage("");
    setTouched({});
    setName("");
    setEmail("");
    setPassword("");
    setRecoveryEmail("");
    setNewPassword("");
    setConfirmNewPassword("");
    setRecoveryName("");
    setFoundEmails([]);
    setResetStep("email");
    setShowPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) return "Email is required";
    if (/\s/.test(value.trim())) return "Email must not contain spaces";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
      return "Enter a valid email address";
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value.trim()) return "Password is required";
    if (/\s/.test(value)) return "Password must not contain spaces";
    if (value.length < 4) return "Password must be at least 4 characters";
    return "";
  };

  const validateName = (value: string) => {
    if (!value.trim()) return "Name is required";
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errors: FieldErrors = { ...fieldErrors };
    if (field === "name") errors.name = validateName(name);
    if (field === "email") errors.email = validateEmail(email);
    if (field === "password") errors.password = validatePassword(password);
    if (field === "recoveryEmail") errors.recoveryEmail = validateEmail(recoveryEmail);
    if (field === "recoveryName") errors.recoveryName = validateName(recoveryName);
    if (field === "newPassword") errors.newPassword = validatePassword(newPassword);
    if (field === "confirmNewPassword") {
      if (!confirmNewPassword) errors.confirmNewPassword = "Please confirm your password";
      else if (confirmNewPassword !== newPassword) errors.confirmNewPassword = "Passwords do not match";
      else errors.confirmNewPassword = "";
    }
    setFieldErrors(errors);
  };

  // --- Login / Register submit ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const errors: FieldErrors = {};
    if (mode === "register") errors.name = validateName(name);
    errors.email = validateEmail(email);
    errors.password = validatePassword(password);

    const activeErrors: FieldErrors = {};
    Object.entries(errors).forEach(([key, val]) => {
      if (val) (activeErrors as any)[key] = val;
    });

    if (Object.keys(activeErrors).length > 0) {
      setFieldErrors(activeErrors);
      setTouched({ name: true, email: true, password: true });
      return;
    }

    setFieldErrors({});

    let result;
    if (mode === "login") {
      result = login(email.trim(), password);
    } else {
      result = register(name.trim(), email.trim(), password);
    }

    if (result.success) {
      navigate("/home");
    } else {
      setFormError(result.error);
    }
  };

  // --- Forgot password submit ---
  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (resetStep === "email") {
      const err = validateEmail(recoveryEmail);
      if (err) {
        setFieldErrors({ recoveryEmail: err });
        setTouched({ recoveryEmail: true });
        return;
      }
      setFieldErrors({});
      setResetStep("newPassword");
    } else if (resetStep === "newPassword") {
      const pwErr = validatePassword(newPassword);
      let confirmErr = "";
      if (!confirmNewPassword) confirmErr = "Please confirm your password";
      else if (confirmNewPassword !== newPassword) confirmErr = "Passwords do not match";

      if (pwErr || confirmErr) {
        setFieldErrors({ newPassword: pwErr, confirmNewPassword: confirmErr });
        setTouched({ newPassword: true, confirmNewPassword: true });
        return;
      }

      setFieldErrors({});
      const result = resetPassword(recoveryEmail.trim(), newPassword);
      if (result.success) {
        setResetStep("done");
        setSuccessMessage("Password has been reset successfully");
      } else {
        setFormError(result.error);
      }
    }
  };

  // --- Forgot email submit ---
  const handleForgotEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const err = validateName(recoveryName);
    if (err) {
      setFieldErrors({ recoveryName: err });
      setTouched({ recoveryName: true });
      return;
    }

    setFieldErrors({});
    const result = findEmailByName(recoveryName.trim());
    if (result.success) {
      setFoundEmails(result.emails);
      setFormError("");
    } else {
      setFormError(result.error);
      setFoundEmails([]);
    }
  };

  const switchMode = (newMode: ViewMode) => {
    clearState();
    setMode(newMode);
  };

  const handleMinimize = () => window.electronAPI?.windowMinimize();
  const handleResize = () => window.electronAPI?.windowResize();
  const handleClose = () => window.electronAPI?.windowClose();

  const EyeToggle = ({ visible, onToggle }: { visible: boolean; onToggle: () => void }) => (
    <button type="button" className={classes.eyeToggle} onClick={onToggle} tabIndex={-1}>
      {visible ? (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
        </svg>
      )}
    </button>
  );

  const BackButton = () => (
    <button className={classes.backLink} onClick={() => switchMode("login")}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
      Back to Sign In
    </button>
  );

  const ErrorBanner = () =>
    formError ? (
      <div className={classes.errorBanner}>
        <svg className={classes.errorBannerIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <span className={classes.errorBannerText}>{formError}</span>
      </div>
    ) : null;

  const SuccessBanner = () =>
    successMessage ? (
      <div className={classes.successBanner}>
        <svg className={classes.successBannerIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <span className={classes.successBannerText}>{successMessage}</span>
      </div>
    ) : null;

  // ---------- Render ----------
  const renderLoginRegister = () => (
    <>
      <h1 className={classes.title}>{mode === "login" ? "Sign In" : "Sign Up"}</h1>

      <ErrorBanner />

      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        {mode === "register" && (
          <div className={classes.inputGroup}>
            <input
              className={`${classes.input} ${touched.name && fieldErrors.name ? classes.inputError : ""}`}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (touched.name) setFieldErrors((prev) => ({ ...prev, name: validateName(e.target.value) }));
              }}
              onBlur={() => handleBlur("name")}
            />
            <div className={classes.fieldErrorWrapper}>
              {touched.name && fieldErrors.name && (
                <span className={classes.fieldError}>{fieldErrors.name}</span>
              )}
            </div>
          </div>
        )}

        <div className={classes.inputGroup}>
          <input
            className={`${classes.input} ${touched.email && fieldErrors.email ? classes.inputError : ""}`}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched.email) setFieldErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
              if (formError) setFormError("");
            }}
            onBlur={() => handleBlur("email")}
          />
          <div className={classes.fieldErrorWrapper}>
            {touched.email && fieldErrors.email && (
              <span className={classes.fieldError}>{fieldErrors.email}</span>
            )}
          </div>
        </div>

        <div className={classes.inputGroup}>
          <div className={classes.passwordWrapper}>
            <input
              className={`${classes.input} ${classes.passwordInput} ${touched.password && fieldErrors.password ? classes.inputError : ""}`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (touched.password) setFieldErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
                if (formError) setFormError("");
              }}
              onBlur={() => handleBlur("password")}
            />
            <EyeToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />
          </div>
          <div className={classes.fieldErrorWrapper}>
            {touched.password && fieldErrors.password && (
              <span className={classes.fieldError}>{fieldErrors.password}</span>
            )}
          </div>
        </div>

        <button className={classes.button} type="submit">
          {mode === "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      {mode === "login" && (
        <div className={classes.forgotLinks}>
          <button className={classes.forgotLink} onClick={() => switchMode("forgotPassword")}>
            Forgot password?
          </button>
          <button className={classes.forgotLink} onClick={() => switchMode("forgotEmail")}>
            Forgot email?
          </button>
        </div>
      )}

      <p className={classes.toggle}>
        {mode === "login" ? "New here? " : "Already have an account? "}
        <span onClick={() => switchMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Sign up now" : "Sign in"}
        </span>
      </p>
    </>
  );

  const renderForgotPassword = () => (
    <>
      <BackButton />
      <h1 className={classes.title}>Reset Password</h1>

      <ErrorBanner />
      <SuccessBanner />

      {resetStep === "email" && (
        <>
          <p className={classes.subtitle}>
            Enter the email address associated with your account.
          </p>
          <form className={classes.form} onSubmit={handleForgotPasswordSubmit} noValidate>
            <div className={classes.inputGroup}>
              <input
                className={`${classes.input} ${touched.recoveryEmail && fieldErrors.recoveryEmail ? classes.inputError : ""}`}
                type="email"
                placeholder="Email"
                value={recoveryEmail}
                onChange={(e) => {
                  setRecoveryEmail(e.target.value);
                  if (touched.recoveryEmail) setFieldErrors((prev) => ({ ...prev, recoveryEmail: validateEmail(e.target.value) }));
                  if (formError) setFormError("");
                }}
                onBlur={() => handleBlur("recoveryEmail")}
              />
              <div className={classes.fieldErrorWrapper}>
                {touched.recoveryEmail && fieldErrors.recoveryEmail && (
                  <span className={classes.fieldError}>{fieldErrors.recoveryEmail}</span>
                )}
              </div>
            </div>
            <button className={classes.button} type="submit">Continue</button>
          </form>
        </>
      )}

      {resetStep === "newPassword" && (
        <>
          <p className={classes.subtitle}>
            Create a new password for your account.
          </p>
          <form className={classes.form} onSubmit={handleForgotPasswordSubmit} noValidate>
            <div className={classes.inputGroup}>
              <div className={classes.passwordWrapper}>
                <input
                  className={`${classes.input} ${classes.passwordInput} ${touched.newPassword && fieldErrors.newPassword ? classes.inputError : ""}`}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (touched.newPassword) setFieldErrors((prev) => ({ ...prev, newPassword: validatePassword(e.target.value) }));
                    if (formError) setFormError("");
                  }}
                  onBlur={() => handleBlur("newPassword")}
                />
                <EyeToggle visible={showNewPassword} onToggle={() => setShowNewPassword((v) => !v)} />
              </div>
              <div className={classes.fieldErrorWrapper}>
                {touched.newPassword && fieldErrors.newPassword && (
                  <span className={classes.fieldError}>{fieldErrors.newPassword}</span>
                )}
              </div>
            </div>
            <div className={classes.inputGroup}>
              <div className={classes.passwordWrapper}>
                <input
                  className={`${classes.input} ${classes.passwordInput} ${touched.confirmNewPassword && fieldErrors.confirmNewPassword ? classes.inputError : ""}`}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                    if (touched.confirmNewPassword) {
                      const err = e.target.value !== newPassword ? "Passwords do not match" : "";
                      setFieldErrors((prev) => ({ ...prev, confirmNewPassword: err }));
                    }
                    if (formError) setFormError("");
                  }}
                  onBlur={() => handleBlur("confirmNewPassword")}
                />
                <EyeToggle visible={showConfirmPassword} onToggle={() => setShowConfirmPassword((v) => !v)} />
              </div>
              <div className={classes.fieldErrorWrapper}>
                {touched.confirmNewPassword && fieldErrors.confirmNewPassword && (
                  <span className={classes.fieldError}>{fieldErrors.confirmNewPassword}</span>
                )}
              </div>
            </div>
            <button className={classes.button} type="submit">Reset Password</button>
          </form>
        </>
      )}

      {resetStep === "done" && (
        <>
          <p className={classes.subtitle}>
            You can now sign in with your new password.
          </p>
          <button className={classes.button} onClick={() => switchMode("login")}>
            Sign In
          </button>
        </>
      )}
    </>
  );

  const renderForgotEmail = () => (
    <>
      <BackButton />
      <h1 className={classes.title}>Find Email</h1>

      <ErrorBanner />

      <p className={classes.subtitle}>
        Enter your name to look up the email associated with your account.
      </p>

      <form className={classes.form} onSubmit={handleForgotEmailSubmit} noValidate>
        <div className={classes.inputGroup}>
          <input
            className={`${classes.input} ${touched.recoveryName && fieldErrors.recoveryName ? classes.inputError : ""}`}
            type="text"
            placeholder="Your name"
            value={recoveryName}
            onChange={(e) => {
              setRecoveryName(e.target.value);
              if (touched.recoveryName) setFieldErrors((prev) => ({ ...prev, recoveryName: validateName(e.target.value) }));
              if (formError) setFormError("");
              setFoundEmails([]);
            }}
            onBlur={() => handleBlur("recoveryName")}
          />
          <div className={classes.fieldErrorWrapper}>
            {touched.recoveryName && fieldErrors.recoveryName && (
              <span className={classes.fieldError}>{fieldErrors.recoveryName}</span>
            )}
          </div>
        </div>
        <button className={classes.button} type="submit">Find Email</button>
      </form>

      {foundEmails.length > 0 && (
        <div className={classes.emailResult}>
          <div className={classes.emailResultLabel}>
            {foundEmails.length === 1 ? "Email found:" : "Emails found:"}
          </div>
          {foundEmails.map((em, i) => (
            <div key={i} className={classes.emailResultValue}>{em}</div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <>
      <div className={classes.titleBar}>
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
      <div className={classes.page}>
        <div className={classes.card}>
          {(mode === "login" || mode === "register") && renderLoginRegister()}
          {mode === "forgotPassword" && renderForgotPassword()}
          {mode === "forgotEmail" && renderForgotEmail()}
        </div>
      </div>
    </>
  );
};
