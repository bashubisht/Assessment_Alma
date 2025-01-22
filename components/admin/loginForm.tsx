import React, { ChangeEvent } from "react";

interface LoginFormProps {
  username: string;
  password: string;
  onUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onLogin,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #f9fadf 0%, #eff5cc 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          color: "#000",
        }}
      >
        Alma Admin Portal
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "40px",
          paddingLeft: "15px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px", fontFamily: "sans-serif" }}>
          Login Required
        </h1>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={onUsernameChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={onPasswordChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        />

        <button
          onClick={onLogin}
          style={{
            width: "108%",
            backgroundColor: "black",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = "#333";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = "black";
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
