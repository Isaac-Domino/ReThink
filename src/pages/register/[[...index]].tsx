import { SignUp } from "@clerk/nextjs";
import React from "react";

const RegisterPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <SignUp
        path="/register"
        afterSignUpUrl={"/login"}
        signInUrl="/login"
        routing="path"
      />
    </main>
  );
};

export default RegisterPage;
