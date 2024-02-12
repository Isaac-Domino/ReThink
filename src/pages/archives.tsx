"use client";

import Link from "next/link";
import React from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import Archive from "@/components/archive";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function create() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isSignedIn, user } = useUser();

  return (
    <div className="px-5 md:px-[55px] w-full py-4 md:py-[24px]">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <Image width={50} height={50} src={"/Logo.png"} alt={"Logo"} />
        </Link>

        {/**USER AUTHENTICATION */}
        <ul className="flex gap-4 items-center">
          <li className="font-medium text-[18px] md:text-[22px] text-primaryColor">
            <Link href={"/"}>Home</Link>
          </li>

          {isSignedIn || user ? (
            <UserButton />
          ) : (
            <Button
              variant={"link"}
              className="bg-gradient-to-r from-violet-900 to-purple-500 hover:bg-violet-600 text-white px-3 rounded-sm py-2 "
            >
              <Link href={"/login"}>Login</Link>
            </Button>
          )}
        </ul>
      </nav>

      {/**ARCHIVES */}
      <div className="border-gray-20 shadow-lg border-[1px] rounded-md relative w-full min-h-screen mt-[50px] md:mt-[90px] mx-auto">
        <div className="flex w-auto mt-[50px] mx-[10px] my-[15px] p-2 md:p-6 gap-8 items-start flex-col">
          <h3 className="self-center sm:text-[25px] md:text-[27px]">
            Your archives
          </h3>

          {/**ARCHIVES */}
          <div className="w-full h-auto">
            <div className="flex items-start gap-8 flex-col">
              <Dialog>
                <DialogTrigger asChild>
                  {/**CREATE BUTTON HERE */}
                  <div className="flex flex-col gap-2">
                    <button
                      disabled={!isSignedIn || !user}
                      className={`${
                        !isSignedIn || !user
                          ? "bg-gray-500"
                          : "bg-[#4B3F94] hover:bg-violet-700"
                      } text-center w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] duration-200 ease-in-out text-white rounded-md text-[18px]`}
                      type="button"
                    >
                      <Plus size={32} className="m-auto" />
                    </button>
                    <span className="text-[#55545E] font-medium ">
                      Create new
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create new document</DialogTitle>
                    <DialogDescription>
                      Make changes to your new work here. Click save when youre
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name of your work
                      </Label>
                      <Input
                        id="name"
                        value="document name"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="number" className="text-right">
                        Number of document
                      </Label>
                      <Input
                        id="documnumberent"
                        value={0}
                        type="number"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="questions" className="text-right">
                        Number of questions
                      </Label>
                      <Input
                        id="questions"
                        value={0}
                        type="number"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    {/**AFTER SUBMITTING THE FORM THEN GO TO THE MAIN PAGE WITH
                     * THE DETAILS ENTERED BY THE USER */}
                    <Button
                      type="submit"
                      className="bg-primaryColor
                    hover:bg-violet-400 duration-200 ease-in-out"
                    >
                      <Link href={"/main"}>Save changes</Link>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/**ARCHIVES LISTS */}
              {isSignedIn || user ? (
                <div className="border scroll-auto w-auto min-w-full max-w-[1180px] min-h-[700px]">
                  {/**archive items */}
                  <div className="h-auto w-fit min-w-max">
                    {/**START MAPPING ITEMS HERE */}
                    <Archive />
                  </div>
                </div>
              ) : (
                <p className="self-center mx-auto mt-[70px] text-[18px] font-normal text-[#A09EA8]">
                  Log in to continue
                </p>
              )}
            </div>
          </div>
        </div>

        {/**PROPS IMAGES */}
        <Image
          src={"/book.svg"}
          alt="book avatar"
          width={100}
          height={50}
          quality={100}
          className="absolute top-1 right-2 w-[50px] md:w-auto"
        />

        <Image
          src={"/woman-with-book.svg"}
          alt="book avatar"
          width={100}
          height={100}
          quality={100}
          sizes="100vw"
          className="absolute left-2 bottom-0 w-[70px] md:w-auto"
        />
      </div>
    </div>
  );
}
