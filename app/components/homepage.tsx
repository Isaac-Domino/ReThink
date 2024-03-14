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

const purpose = [
  {
    id: 1,
    title: 'For Students',
  },
  {
    id: 2,
    title: 'For Researchers'
  },
  {
    id: 3,
    title: 'For Professionals'
  }
]
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
    image: '/convert.svg',
    alt: 'convert.svg'

  },
  {
    icon: 
     <CheckCircle2 
         color="white"
         size={32}
         className="bg-secondaryColor text-md rounded-full"
     />,
    title: 'Intuitive UI',
    description: `Designed a clean and intuitive UI 
      with easy-to-understand controls.`,
    image: '/ui.svg',
    alt: 'ui.svg'
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
    image: '/bot.svg',
    alt: 'bot.svg'

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
    image: '/userfriendly.svg',
    alt: 'userfriendly.svg'
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
      <StickyNavbar inView={inView} />

      <main className="w-full z-10 px-2 sm:px-8 md:px-[80px] py-4 lg:px-[90px] min-w-full h-auto min-h-screen relative">
        <div>
          <div ref={ref}>
            <Navbar />
          </div>

          {/**HERO SECTION */}
          <Hero />

          <div
            className="w-full absolute top-0 left-0 
           h-[350px] 
           sm:h-[430px]
           md:h-[530px]
           lg:h-[570px] 
           bg-gradient-to-br from-[#4d7cb1] 
           to-[#4D3FA3] 
          -z-10"
          />
        </div>

        {/**SECOND CONTENT */}
        <motion.div
          ref={scrollRef}
          style={{
            opacity: scrollYProgress,
          }}
          transition={{ ease: "linear", delay: 1 }}
          className="w-full mt-[60px] md:mt-[75px]  
           h-[200px] md:h-[350px] justify-center items-center flex mb-4"
        >
          <div className="flex justify-evenly w-full items-center">
            <div className="h-auto w-[450px]  ">
              <Image
                width={250}
                height={250}
                src={"/chatbot.svg"}
                alt="chatbot png"
              />
            </div>

            <div className="h-auto w-[550px] ">
              <p className="md:text-[30px] text-center sm:text-[25px] text-md leading-normal text-[#2e2b41]">
                Working with AI to enhance your prompts and for accurate
                results.
              </p>
            </div>
          </div>
        </motion.div>

        {/**THIRD CONTENT*/}
        <div className="w-full mt-[20px] lg:mt-[50px] rounded-lg">
          <section className="py-[35px] px-[25px] flex flex-col items-center gap-4">
            <div className="inline-flex items-center flex-col gap-3 h-auto">
              <h1 className="text-[#1e1e30] font-normal leading-[45px] md:leading-[70px] text-[37px] md:text-[55px]">
                See features in action
              </h1>
              <p className="text-[18px] text-balance md:text-[24px]">
                Discover exclusive features on our site
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0.5, x: 600 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: "spring" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[65px] items-center w-full"
            >
              {/**MAPPING THE FEATURES HERE */}

              {/*features.map((item, index) => (
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
                   )) */}
              {features.map((item, index) => (
                <div
                  key={index}
                  className="w-auto shadow-sm justify-center rounded-lg flex items-center py-2 px-4 h-[150px]  "
                >
                  <div className="flex items-start min-w-[250px] max-w-[400px] gap-4 ">
                    <Image
                      src={item.image}
                      width={50}
                      className=""
                      height={50}
                      alt={item.alt}
                    />

                    <div className="flex text-start flex-col gap-4">
                      <h2 className="text-[20px] text-[#381E6F] md:text-[22px] lg:text-[25px] font-medium">
                        {item.title}
                      </h2>
                      <p className="text-sm font-light md:text-[15] lg:text-[15px] text-pretty">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </section>
        </div>

        <div className="w-full h-auto mt-[55px]">
          <div className="flex justify-evenly  items-center">
            {purpose.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <CheckCircle2
                  color="white"
                  size={25}
                  className="bg-secondaryColor text-md rounded-full"
                />
                 <p className="font-medium text-md md:text-xl text-secondaryColor">{item.title}</p>
                
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="w-full md:px-4 py-11   flex mx-auto justify-center items-center bg-gradient-to-tr from-[#bca7d8] to-[#464d92] mt-[75px]">
        <div className="flex w-auto items-center space-x-[55px] md:space-x-[120px]">
          <Image
            src={"/laptop-3d.svg"}
            height={260}
            width={260}
            alt="laptop-3d.svg"
            className="w-[200px] md:w-[260px]"
          />

          <h1 className="text-white font-normal text-[22px] md:text-[27px] lg:text-[37px] ">
            Read, Search, Interact
          </h1>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;