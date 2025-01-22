import React from "react";

const SuccessModal: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          maxWidth: "300px",
          width: "80%",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            color: "#4caf50",
            marginBottom: "10px",
          }}
        >
          &#10003;
        </div>
        <h2 style={{ margin: 0, fontFamily: "sans-serif" }}>Login Successful!</h2>
        <p style={{ marginTop: "10px", fontFamily: "sans-serif" }}>
          You have been successfully authenticated.
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;
