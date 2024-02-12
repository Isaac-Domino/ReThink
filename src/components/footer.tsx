import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
const Footer = () => {
  const router = useRouter();
  return (
    <main
      className={`w-full bg-slate-900 text-slate-700 py-14 px-8 flex flex-col gap-4 ${
        router.pathname.includes("/login") ||
        router.pathname.includes("/register") ||
        router.pathname.includes("/archives")
          ? "hidden"
          : "flex"
      }`}
    >
      <div className="flex justify-evenly">
        <div className="flex flex-col">
          <Link href={"/"}>Social Media</Link>
          <Link href={"/"}>Contacts</Link>
          <Link href={"/"}>About Us</Link>
        </div>
        <div className="flex flex-col">
          <Link href={"/"}>Terms and Condition</Link>
          <Link href={"/"}>Disclaimer</Link>
          <Link href={"/"}>Data Privacy</Link>
        </div>
        <div>
          <p>Copyright &#169; 2024 ReThink</p>
          <p>9-606-8104-848</p>
        </div>
      </div>
    </main>
  );
};

export default Footer;
