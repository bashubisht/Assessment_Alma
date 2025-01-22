import React, { useState, ChangeEvent } from "react";
import LoginForm from "../components/admin/loginForm";
import InternalLeads from "./internalLeadsPage";
import SuccessModal from "../components/admin/successModal";

const InternalLeadsPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleLogin = (): void => {
    if (!username.trim() || !password.trim()) {
      alert("Please fill in both username and password.");
      return;
    }
    if (username === "admin" && password === "alma123") {
      setIsAuthenticated(true);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else {
      alert("Invalid username or password!");
    }
  };

  if (!isAuthenticated) {
    return (
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={handleUsernameChange}
        onPasswordChange={handlePasswordChange}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <InternalLeads />
      {showSuccess && <SuccessModal />}
    </div>
  );
};

export default InternalLeadsPage;
