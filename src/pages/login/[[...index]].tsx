import { SignIn } from "@clerk/nextjs";
import React from "react";

const LoginPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <SignIn
        path="/login"
        afterSignInUrl={"/create"}
        signUpUrl="/register"
        routing="path"
      />
    </main>
  );
};

export default LoginPage;
