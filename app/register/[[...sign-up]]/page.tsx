import { SignUp } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import NavbarMain from "@/components/navbar-main";
import { Metadata } from "next";


export const metadata: Metadata ={ 
    title: 'Sign up',
}

const RegisterPage = () => {
  return (
    <>
      <NavbarMain />
      <main className="min-h-screen w-full flex items-center justify-center">
        <div className="flex flex-col md:flex-row w-full min-h-screen justify-evenly items-center mx-[100px] ">
          <Image
            src={"/Sign up.svg"}
            width={400}
            height={300}
            alt="Sign up svg"
            className=""
          />

          <div className="h-auto rounded-lg shadow-sm">
            <SignUp
              appearance={{
                variables: {
                  colorPrimary: "#4D3FA3",
                  colorDanger: "red",
                  fontSmoothing: "antialiased",
                  colorSuccess: "green",
                },
              }}
              redirectUrl={"/archives"}
              path="/register"
              signInUrl="/login"
              routing="virtual"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default RegisterPage;