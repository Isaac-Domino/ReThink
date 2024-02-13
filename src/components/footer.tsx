import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";




const Footer = () => {
  const router = useRouter();
  return (
    <main
      className={`w-full bg-[#50495a] text-sm md:text-[18px] text-white py-12 px-4 items-center flex flex-col gap-4 ${
        router.pathname.includes("/login") ||
        router.pathname.includes("/register") || 
        router.pathname.includes("/main") 
          ? "hidden"
          : "flex"
      }`}
    >
      <div className="grid grid-cols-3  justify-between gap-8 items-start">
        <div className="flex flex-col gap-4">
          <Link href={"/"}>Social Media</Link>
          <Link href={"/"}>Contacts</Link>
          <Link href={"/"}>About Us</Link>
        </div>

        <div className="flex flex-col gap-4">
          <Link href={"/"}>Terms and Condition</Link>
          <Link href={"/"}>Disclaimer</Link>
          <Link href={"/"}>Data Privacy</Link>
        </div>


        <div className="flex flex-col gap-2 ">
          <p className="text-sm md:text-[18px]">Copyright &#169; 2024 ReThink</p>
          <p className="text-sm md:text-[18px]">9-606-8104-848</p>
        </div>

      </div>
    </main>
  );
};

export default Footer;
