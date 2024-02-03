import { SignIn } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
const LoginPage = () => {
  return (

    <main className="min-h-screen w-auto flex items-center justify-center">
       <div className="flex flex-col md:flex-row w-full min-h-screen justify-between items-center mx-[55px] ">
           <Image 
              src={'/Sign in.svg'}
              width={500}
              height={500}
              alt="Sign in svg"
              className=""
           />

      <div className="h-auto md:border p-12 rounded-lg shadow-sm">
       <SignIn
        path="/login"
        afterSignInUrl={"/create"}
        signUpUrl="/register"
        routing="path"
      />
         </div>
       </div>
    </main>
  );
};

export default LoginPage;
