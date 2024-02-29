'use client'

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from 'next/image'
import React, { useRef } from "react";
import { CheckCircle2 } from 'lucide-react';
import { motion, useScroll } from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import Hero from "@/components/Hero";
import StickyNavbar from "./StickyNavbar";
import About from "./About";


const features = [
  {
    icon: 
     <CheckCircle2 
         color="white"
         size={32}
         className="bg-secondaryColor text-md  rounded-full"
     />,
    title: 'File conversion',
    description: 'Automatically convert any document file to .pdf',
    image: <Image src={'/upload.svg'} width={40} height={40} alt="upload icon" />

  },
  {
    icon: 
     <CheckCircle2 
         color="white"
         size={32}
         className="bg-secondaryColor text-md  rounded-full"
     />,
    title: 'Chat System',
    description: 'AI-powered Chat for faster and smarter communication',
    image: <Image src={'/Chat icon.svg'} width={40} height={40} alt="chat icon" />

  },
  {
    icon: 
     <CheckCircle2 
         color="white"
         size={32}
         className="bg-secondaryColor text-md  rounded-full"
     />,
    title: 'User Friendly',
    description: 'Simplify and streamline for a hassle-free experience.',
    image: <Image src={'/user-friendly.svg'} width={40} height={40} alt="user friendly icon" />
  },
  {
    icon: 
     <CheckCircle2 
         color="white"
         size={32}
         className="bg-secondaryColor text-md  rounded-full"
     />,
    title: 'Very Responsive',
    description: 'Accurate and quick responses',
    image: <Image src={'/responsive.svg'} width={40} height={40} alt="green frame clock icon" />
  },

]


const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, } = useScroll({
    target: scrollRef,
    offset: ["0 1", "1.33 1"]
  });

  const [ref, inView] = useInView({
    threshold: 0,
  });


  /**LANDING PAGE */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", type: "tween" }}
    >
      <StickyNavbar inView={inView}/>

      <main className="w-full z-10 px-2 sm:px-8 md:px-[60px] py-4 lg:px-[90px] min-w-full h-auto min-h-screen relative">
        <div>
           <div ref={ref} >
            <Navbar />
           </div> 

          {/**HERO SECTION */}
          <Hero />

         {/** <Image
            src={"/bg-new.svg"}
            alt="background"
            className="absolute h-[550px] md:h-[640px]  object-bottom bg-center w-full top-[-70px] left-0 -z-10"
            quality={100}
            width={800}
            height={500}
            style={{
              objectFit: "cover",
            }}
          />*/} 

          <div className="w-full absolute top-0 left-0 
          h-[400px] sm:h-[470px]
          md:h-[570px] lg:h-[640px] 
          bg-gradient-to-br from-[#4d7cb1] 
           to-[#4D3FA3] 
          -z-10">
             
          </div>
        </div>

        {/**SECOND CONTENT */}
        <motion.div
          ref={scrollRef}
          style={{
            opacity: scrollYProgress,
          }}
          transition={{ ease: "linear", delay: 1 }}
          className="w-full mt-[130px] md:mt-[220px] 
           h-auto items-center flex mb-4"
        >
          <div className="flex gap-4 px-2 justify-between w-full h-auto items-center">
            <div className="h-auto w-auto">
              <Image
                width={300}
                height={300}
                src={"/sammy-line-woman-on-skateboard-with-file-folders.gif"}
                alt="animated gif" 
              />
            </div>

             <div className=" max-w-[600px] h-auto">
              <p className="md:text-[30px] sm:text-[25px] text-md leading-normal text-[#2e2b41]">
                Working with AI to enhance your prompts and for accurate
                results.
              </p>      
                  
            </div>
          </div>
        </motion.div>

        {/**THIRD CONTENT*/}
        <div className="w-full mt-[70px] rounded-lg">
          <section className="py-[35px] flex flex-col items-center gap-6">
            <h2 className="text-primaryColor font-medium text-[28px] md:text-[35px]">
              See features in action
            </h2>

                <motion.div 
                       initial={{ opacity: .50, x:600}}
                       viewport={{ once: true, }}
                       whileInView={{ opacity: 1, x: 0}}
                       transition={{ type:"spring" }} 
                       className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-[35px] px-[10px] md:p-[20px] lg:px-[30px] justify-around mx-auto grid-rows-2 items-center w-full">
                    {/**MAPPING THE FEATURES HERE */}
               
                   {features.map((item, index) => (
                      <div
                        key={index} className="p-[16px]
                         shadow-md flex bg-violet-100  justify-between items-center h-[90px] rounded-lg">
                    
                       <div className="flex w-[250px] sm:w-[350px] md:w-[500px] max-w-[400px] gap-4 items-center">
                           <div>
                             {item.icon}
                           </div>
                           <div className="flex flex-col">
                              <h3 className="text-[18px] md:text-xl">{item.title}</h3>
                              <span className="font-light text-[13px] lg:text-[14px]">{item.description}</span>
                           </div>
                       </div>

                  <div>{item.image}</div>
                </div>
              ))}
            </motion.div>
          </section>
        </div>

        {/**ABOUT CONTENT */}
        <div className="md:mt-[55px]">
           <About />
        </div>
      </main>

      <div className="w-full md:px-4 flex h-[400px] sm:h-[440px] lg:h-[500px] bg-[#9A8DCD] mt-[75px]">
        <div className="w-full mt-[25px] ">
          <div className="flex flex-col  gap-[20px] md:gap-[40px] items-center mx-auto w-auto ">
            <h1 className="text-white leading-relaxed font-normal text-center text-3xl mt-7 lg:text-4xl">
              Read, Search, Interact
            </h1>

            <div className="flex mt-[25px] mb-[45px]  items-center px-2 gap-4 md:gap-6 rounded-md w-auto">
              <Image
                width={450}
                height={400}
                src={"/Desktop - content.png"}
                alt="preview desktop"
                className="rounded-lg w-[250px] sm:w-[270px] lg:w-[400px] shadow-xl"
                quality={100}
              />

              <Image
                width={105}
                height={200}
                src={"/Mobile.png"}
                alt="preview mobile"
                className="rounded-lg self-end w-[85px] lg:w-auto shadow-xl"
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
   );
};

export default Home;