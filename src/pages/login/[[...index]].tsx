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

      <div className="h-auto p-12 rounded-lg shadow-sm">
         <SignIn
            appearance={{
              variables: {
                colorPrimary: "#166792",
                colorDanger: "red",
                fontSmoothing: "antialiased",
               colorSuccess: "green"
              }
            }}
            path="/login"
            afterSignInUrl={"/archives"}
            signUpUrl="/register"
            routing="path"
          />
         </div>
       </div>
    </main>
  );
};

export default LoginPage;
