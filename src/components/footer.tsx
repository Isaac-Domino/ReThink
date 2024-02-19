import Link from "next/link";
import React from "react";
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
import { FacebookIcon, InstagramIcon, MailIcon, Phone } from "lucide-react";

const Footer = () => {
  const router = useRouter();
  return (
    <main
      className={`w-full bg-gray-900 text-xs md:text-[18px] text-slate-700 py-12 px-4 items-center flex flex-col gap-4 ${
        router.pathname.includes("/login") ||
        router.pathname.includes("/register") ||
        router.pathname.includes("/main")
          ? "hidden"
          : "flex"
      }`}
    >
      <div className="w-full flex justify-between">
        <div className="space-y-1 text-gray-700">
          <Link href={"/"} className="flex gap-2">
            <InstagramIcon /> ReThink
          </Link>
          <Link
            href={"https://www.facebook.com/profile.php?id=61556625899850"}
            className="flex gap-2"
          >
            <FacebookIcon /> ReThink - GAWA
          </Link>
          <div className="flex gap-2">
            <MailIcon /> rethinkgawa@gmail.com
          </div>
          <div className="flex gap-2">
            <Phone /> +639606810484
          </div>
        </div>
        <div className="flex flex-col align-top text-slate-600">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" className="text-slate-700">
                Disclaimer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>DISCLAIMER</AlertDialogTitle>
                <AlertDialogDescription>
                  ReThink assists users in scanning and comprehending PDF files;
                  however, users should check the authenticity of the
                  information presented because it is meant for general guidance
                  rather than professional advice. While ReThink strives for
                  accuracy, it relies on algorithms and data analysis, which may
                  not always produce ideal outcomes. It is the responsibility of
                  the user to acquire the required rights for any content they
                  upload. ReThink is not a substitute for expert advice and
                  should not be used for legal, financial, medical, or technical
                  matters. Users acknowledge that by using ReThink, they accept
                  these conditions and that neither ReThink nor its producers
                  are responsible for any decisions made using the material on
                  the site.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Exit</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" className="text-slate-700">
                Terms and Condition
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>TERMS AND CONDITION</AlertDialogTitle>
                <AlertDialogDescription>
                  These terms and conditions apply to your use of the ReThink
                  website. You accept these Terms by using or accessing this
                  website. You are not permitted to use the Website if you
                  disagree with any part of the Terms. 1. Use of Service 1.1
                  ReThink offers a platform where users can upload PDF files for
                  scanning and receive responses to inquiries about the PDF's
                  content. 1.2 Through your use of this website, you agree to
                  avoid uploading any PDF files that violate third-party rights,
                  such as copyright, trademarks, privacy, or other intellectual
                  or personal rights. 1.3 You pledge to abide by these Terms and
                  will not use the Website for any illegal purposes. 2. User
                  Responsibilities 2.1 You are solely responsible for the PDF
                  files you upload to the Website. ReThink does not assume any
                  responsibility or liability for the content of the PDF files
                  uploaded by users. 2.2 You acknowledge that the responses
                  offered by the Website should only be used for informational
                  purposes and should never be used in place of expert advice or
                  discretion. 2.3 You agree to abstain from uploading,
                  transmitting, or disseminating any content that is illegal,
                  dangerous, obscene, abusive, harassing, defamatory, vulgar, or
                  otherwise objectionable on the Website. 3. Limitation of
                  Liability. 4.1 ReThink shall not be liable for any
                  damages—direct, indirect, incidental, special, consequential,
                  or punitive—that result from your use of the website or any of
                  its content. 4.2 ReThink makes no assurance that the Website
                  will be uninterrupted or error-free, nor does it make any
                  warranty about the accuracy, completeness, or reliability of
                  any content acquired from the Website. 4. Indemnification You
                  agree to indemnify and hold harmless ReThink, its affiliates,
                  officers, directors, employees, agents, and licensors from and
                  against any and all claims, liabilities, damages, losses,
                  costs, or expenses (including reasonable attorneys' fees)
                  arising from or in any way related to your use of the Website
                  or violation of these Terms. 5. Modifications to Terms ReThink
                  has the right to amend these Terms at any moment without prior
                  notice. By continuing to use the Website following such
                  changes, you agree to be bound by the new Terms. 6. Contact Us
                  If you have any questions or concerns about these Terms,
                  please contact us at [ReThink Email HERE]. By using the
                  ReThink website, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Exit</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex justify-center items-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" className="text-slate-700">
                HOW TO USE
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>HOW TO USE</AlertDialogTitle>
                <AlertDialogDescription>
                  These terms and conditions apply to your use of the ReThink
                  website. You accept these Terms by using or accessing this
                  website. You are not permitted to use the Website if you
                  disagree with any part of the Terms. 1. Use of Service 1.1
                  ReThink offers a platform where users can upload PDF files for
                  scanning and receive responses to inquiries about the PDF's
                  content. 1.2 Through your use of this website, you agree to
                  avoid uploading any PDF files that violate third-party rights,
                  such as copyright, trademarks, privacy, or other intellectual
                  or personal rights. 1.3 You pledge to abide by these Terms and
                  will not use the Website for any illegal purposes. 2. User
                  Responsibilities 2.1 You are solely responsible for the PDF
                  files you upload to the Website. ReThink does not assume any
                  responsibility or liability for the content of the PDF files
                  uploaded by users. 2.2 You acknowledge that the responses
                  offered by the Website should only be used for informational
                  purposes and should never be used in place of expert advice or
                  discretion. 2.3 You agree to abstain from uploading,
                  transmitting, or disseminating any content that is illegal,
                  dangerous, obscene, abusive, harassing, defamatory, vulgar, or
                  otherwise objectionable on the Website. 3. Limitation of
                  Liability. 4.1 ReThink shall not be liable for any
                  damages—direct, indirect, incidental, special, consequential,
                  or punitive—that result from your use of the website or any of
                  its content. 4.2 ReThink makes no assurance that the Website
                  will be uninterrupted or error-free, nor does it make any
                  warranty about the accuracy, completeness, or reliability of
                  any content acquired from the Website. 4. Indemnification You
                  agree to indemnify and hold harmless ReThink, its affiliates,
                  officers, directors, employees, agents, and licensors from and
                  against any and all claims, liabilities, damages, losses,
                  costs, or expenses (including reasonable attorneys' fees)
                  arising from or in any way related to your use of the Website
                  or violation of these Terms. 5. Modifications to Terms ReThink
                  has the right to amend these Terms at any moment without prior
                  notice. By continuing to use the Website following such
                  changes, you agree to be bound by the new Terms. 6. Contact Us
                  If you have any questions or concerns about these Terms,
                  please contact us at [ReThink Email HERE]. By using the
                  ReThink website, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Exit</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className=" w-full mt-2">
        <span className="text-sm">Copyright © 2024 ReThink</span>
      </div>
    </main>
  );
};

export default Footer;
