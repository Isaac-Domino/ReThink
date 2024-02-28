import { SignIn } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import NavbarMain from "@/components/navbar-main";

const LoginPage = () => {
  const router = useRouter();

  return (
    <>
      <NavbarMain />
      <main className="min-h-screen w-full flex items-center justify-center">
        <div className="flex flex-col md:flex-row w-full min-h-screen justify-evenly items-center mx-[100px] ">
          <Image
            src={"/Sign in.svg"}
            width={550}
            height={500}
            alt="Sign in svg"
            className=""
          />

          <div className="h-auto rounded-lg shadow-sm">
            <SignIn
              appearance={{
                variables: {
                  colorPrimary: "#166792",
                  colorDanger: "red",
                  fontSmoothing: "antialiased",
                  colorSuccess: "green",
                },
              }}
              redirectUrl={"/projects"}
              path="/login"
              // signUpUrl="/register"
              routing="virtual"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
