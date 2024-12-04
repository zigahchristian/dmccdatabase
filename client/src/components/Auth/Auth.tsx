import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2070")',
      }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-sm flex flex-col justify-center">
        {showLogin ? (
          <>
          <div className="text-center mt-4">
              <button
                onClick={() => setShowLogin(false)}
                className="text-white hover:text-blue-200 transition-colors"
              >
                Need an account? Register
              </button>
            </div>
            <LoginForm />
            
          </>
        ) : (
          <>
          <div className="text-center mt-4">
              <button
                onClick={() => setShowLogin(true)}
                className="text-white hover:text-blue-200 transition-colors"
              >
                Already have an account? Login
              </button>
            </div>
            <RegisterForm />
            
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
