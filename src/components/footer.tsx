import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Copy, FacebookIcon, InstagramIcon, MailIcon, Phone } from "lucide-react";
import { useToast } from "./ui/use-toast";


const Footer = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('+639606810484');
      setCopySuccess(true);
     
      if(copySuccess) {
        toast({ 
          title: 'Copied',
          variant: 'default'
         })
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopySuccess(false);
    }
  };
  return (
    <main
      className={`w-full relative bottom-0 bg-[#24202b] text-gray-400 text-xs md:text-[18px] py-8 px-2 md:px-12  ${
        router.pathname.includes("/login") ||
        router.pathname.includes("/register") ||
        router.pathname.includes("/main")
          ? "hidden"
          : "flex"
      }`}
    >
      <div className="w-full flex flex-col gap-4 sm:gap-0 sm:flex sm:flex-row sm:justify-between md:items-center">
        <div className="flex  flex-col gap-4 md:gap-[35px] items-center md:items-start">
          <div className="flex flex-row items-center gap-2">
            <Link href={"/"} className="flex gap-2">
              <InstagramIcon
                className="border  border-gray-400 p-1 rounded-full"
                size={30}
                
              />
            </Link>
            <Link
              href={"https://www.facebook.com/profile.php?id=61556625899850"}
              className="flex gap-2"
            >
              <FacebookIcon
                className="border border-gray-400 p-1 rounded-full"
                size={30}
                
              />
            </Link>

            <Link href={"/"} className="flex gap-2 ">
              <MailIcon
                className="border border-gray-400 p-1 rounded-full"
                size={30}
                
              />
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Phone
                  className="border cursor-pointer border-gray-400 p-1  rounded-full"
                  size={30}
                  
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>CONTACT US</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="flex justify-between items-center gap-2 ">
                      <span className="font-medium text-[16px]">
                        +639606810484
                      </span>

                      <Button
                        variant={"outline"}
                        className="self-center "
                        onClick={copyToClipboard}
                      >
                        <Copy className="" />
                      </Button>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Exit</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {/** <span>+639606810484</span> */}
          </div>
        </div>

        <div className="flex justify-evenly md:justify-center items-center flex-col md:flex-row ">
          <div className="flex flex-row items-center text-white">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="link" className="text-gray-400 ">
                  Disclaimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>DISCLAIMER</AlertDialogTitle>
                  <AlertDialogDescription>
                    ReThink assists users in scanning and comprehending PDF
                    files; however, users should check the authenticity of the
                    information presented because it is meant for general
                    guidance rather than professional advice. While ReThink
                    strives for accuracy, it relies on algorithms and data
                    analysis, which may not always produce ideal outcomes. It is
                    the responsibility of the user to acquire the required
                    rights for any content they upload. ReThink is not a
                    substitute for expert advice and should not be used for
                    legal, financial, medical, or technical matters. Users
                    acknowledge that by using ReThink, they accept these
                    conditions and that neither ReThink nor its producers are
                    responsible for any decisions made using the material on the
                    site.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Exit</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="link" className="text-gray-400 ">
                  Terms and Condition
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>TERMS AND CONDITION</AlertDialogTitle>
                  <div className="h-[500px] md:h-[600px] overflow-y-auto">
                    <AlertDialogDescription>
                      These terms and conditions apply to your use of the
                      ReThink website. You accept these Terms by using or
                      accessing this website. You are not permitted to use the
                      Website if you disagree with any part of the Terms. 1. Use
                      of Service 1.1 ReThink offers a platform where users can
                      upload PDF files for scanning and receive responses to
                      inquiries about the PDF's content. 1.2 Through your use of
                      this website, you agree to avoid uploading any PDF files
                      that violate third-party rights, such as copyright,
                      trademarks, privacy, or other intellectual or personal
                      rights. 1.3 You pledge to abide by these Terms and will
                      not use the Website for any illegal purposes. 2. User
                      Responsibilities 2.1 You are solely responsible for the
                      PDF files you upload to the Website. ReThink does not
                      assume any responsibility or liability for the content of
                      the PDF files uploaded by users. 2.2 You acknowledge that
                      the responses offered by the Website should only be used
                      for informational purposes and should never be used in
                      place of expert advice or discretion. 2.3 You agree to
                      abstain from uploading, transmitting, or disseminating any
                      content that is illegal, dangerous, obscene, abusive,
                      harassing, defamatory, vulgar, or otherwise objectionable
                      on the Website. 3. Limitation of Liability. 4.1 ReThink
                      shall not be liable for any damages—direct, indirect,
                      incidental, special, consequential, or punitive—that
                      result from your use of the website or any of its content.
                      4.2 ReThink makes no assurance that the Website will be
                      uninterrupted or error-free, nor does it make any warranty
                      about the accuracy, completeness, or reliability of any
                      content acquired from the Website. 4. Indemnification You
                      agree to indemnify and hold harmless ReThink, its
                      affiliates, officers, directors, employees, agents, and
                      licensors from and against any and all claims,
                      liabilities, damages, losses, costs, or expenses
                      (including reasonable attorneys' fees) arising from or in
                      any way related to your use of the Website or violation of
                      these Terms. 5. Modifications to Terms ReThink has the
                      right to amend these Terms at any moment without prior
                      notice. By continuing to use the Website following such
                      changes, you agree to be bound by the new Terms. 6.
                      Contact Us If you have any questions or concerns about
                      these Terms, please contact us at [ReThink Email HERE]. By
                      using the ReThink website, you acknowledge that you have
                      read, understood, and agree to be bound by these Terms.
                    </AlertDialogDescription>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Exit</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="items-center ">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="link" className="text-gray-400 ">
                    How to Use
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>How to use</AlertDialogTitle>
                    <div className="h-[500px] md:h-[600px] overflow-y-auto">
                      <AlertDialogDescription>
                        These terms and conditions apply to your use of the
                        ReThink website. You accept these Terms by using or
                        accessing this website. You are not permitted to use the
                        Website if you disagree with any part of the Terms. 1.
                        Use of Service 1.1 ReThink offers a platform where users
                        can upload PDF files for scanning and receive responses
                        to inquiries about the PDF's content. 1.2 Through your
                        use of this website, you agree to avoid uploading any
                        PDF files that violate third-party rights, such as
                        copyright, trademarks, privacy, or other intellectual or
                        personal rights. 1.3 You pledge to abide by these Terms
                        and will not use the Website for any illegal purposes.
                        2. User Responsibilities 2.1 You are solely responsible
                        for the PDF files you upload to the Website. ReThink
                        does not assume any responsibility or liability for the
                        content of the PDF files uploaded by users. 2.2 You
                        acknowledge that the responses offered by the Website
                        should only be used for informational purposes and
                        should never be used in place of expert advice or
                        discretion. 2.3 You agree to abstain from uploading,
                        transmitting, or disseminating any content that is
                        illegal, dangerous, obscene, abusive, harassing,
                        defamatory, vulgar, or otherwise objectionable on the
                        Website. 3. Limitation of Liability. 4.1 ReThink shall
                        not be liable for any damages—direct, indirect,
                        incidental, special, consequential, or punitive—that
                        result from your use of the website or any of its
                        content. 4.2 ReThink makes no assurance that the Website
                        will be uninterrupted or error-free, nor does it make
                        any warranty about the accuracy, completeness, or
                        reliability of any content acquired from the Website. 4.
                        Indemnification You agree to indemnify and hold harmless
                        ReThink, its affiliates, officers, directors, employees,
                        agents, and licensors from and against any and all
                        claims, liabilities, damages, losses, costs, or expenses
                        (including reasonable attorneys' fees) arising from or
                        in any way related to your use of the Website or
                        violation of these Terms. 5. Modifications to Terms
                        ReThink has the right to amend these Terms at any moment
                        without prior notice. By continuing to use the Website
                        following such changes, you agree to be bound by the new
                        Terms. 6. Contact Us If you have any questions or
                        concerns about these Terms, please contact us at
                        [ReThink Email HERE]. By using the ReThink website, you
                        acknowledge that you have read, understood, and agree to
                        be bound by these Terms.
                      </AlertDialogDescription>
                    </div>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Exit</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        <div className="mx-auto sm:mx-0">
          <span className="text-sm">Copyright © 2024 ReThink</span>
        </div>
      </div>
    </main>
  );
};

export default Footer;
