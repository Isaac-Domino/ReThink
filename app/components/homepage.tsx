'use client'

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from 'next/image'
import React, { useRef } from "react";
import { CheckCircle2 } from 'lucide-react';
import { motion, useScroll, m, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import Hero from "@/components/Hero";
import StickyNavbar from "./StickyNavbar";


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

const itemVariants = {
    onview: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    offview: {
      y: 250,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
};
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
      className="relative min-h-full overflow-y-clip"
    >
      <StickyNavbar inView={inView} />

      <main className="w-full z-10 px-2 sm:px-8 md:px-[80px] py-4 lg:px-[90px] min-w-full h-auto min-h-full relative">
        <div className="">
          <div ref={ref}>
            <Navbar />
          </div>

          {/**HERO SECTION */}
          <Hero />

          <div
            className="w-full absolute top-0 left-0 
           h-[320px] 
           sm:h-[430px]
           md:h-[530px]
           lg:h-[570px] 
           bg-blend-darken
           bg-gradient-to-br from-[#4d7cb1] 
           via-[#6654ad]
           to-[#4D3FA3] 
           flex items-center -z-10 justify-center"
          >
              
            </div>
        </div>

        {/**SECOND CONTENT */}
        <motion.div
          ref={scrollRef}
          style={{
            opacity: scrollYProgress,
          }}
          transition={{ ease: "linear", delay: 1 }}
          className="w-full mt-[60px] md:mt-[70px]  
           h-[240px] md:h-[350px] justify-center items-center flex mb-4"
        >
          <div className="flex justify-evenly w-full items-center">
              <Image
                width={170}
                height={170}
                src={"/chatbot.svg"}
                alt="chatbot png"
                className="w-[140px] md:w-[190px] lg:w-[230px]"
              />
   

            <div className="h-auto w-[45%]">
              <p className="text-[#362D73] text-center sm:text-[25px] md:text-[30px] text-md leading-normal">
                Working with AI to enhance your prompts and for accurate
                results.
              </p>
            </div>
          </div>
        </motion.div>

        {/**THIRD CONTENT*/}
        <div className="w-full mt-[20px] lg:mt-[50px] rounded-lg">
          <section className="py-[35px] px-[25px] flex flex-col items-center gap-4">
            <div className="inline-flex items-start sm:items-center flex-col gap-4 h-auto">
              <AnimatePresence>
                <motion.h1
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1.1 }}
                  viewport={{ once: true }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring" }}
                  className="text-[#1e1e30] leading-normal sm:leading-[70px] font-normal text-[35px] sm:text-[50px]"
                >
                  See features in action
                </motion.h1>
              </AnimatePresence>

               <motion.p
                  initial={{ scale: 0 }}
                  viewport={{ once: true }}
                  whileInView={{ scale: 1.1 }}
                  exit={{ scale: 0}}
                  transition={{ type: "spring" }}
                  className="text-[17px] text-wrap md:text-[25px]"
                >
                  Discover exclusive features on our site
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[20px] lg:mt-[65px] items-center w-full">
              {features.map((item, index) => (
                <motion.div
                  initial={"offview"}
                  whileInView={"onview"}
                  variants={itemVariants}
                  viewport={{ once: true }}
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
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        <div className="w-full h-auto my-[15px] md:my-[50px] lg:my-[60px]">
          <div className="flex justify-evenly  items-center">
            {purpose.map((item) => (
              <motion.div 
               initial={{ y: 100, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ type: "spring" }}
               key={item.id} className="flex items-center gap-3">
                <CheckCircle2
                  color="white"
                  className="bg-secondaryColor size-[18px] sm:size-[20px] md:size-[25px] lg:size[27px]  text-md rounded-full"
                />
                <p className="font-medium text-[10px] sm:text-md md:text-xl text-secondaryColor">
                  {item.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <div className="w-full md:px-4 py-12 mt-2 lg:mt-12 flex mx-auto justify-center items-center ">
        <div className="flex w-auto items-center space-x-[55px] md:space-x-[120px]">
          <Image
            src={"/laptop-3d.svg"}
            height={260}
            width={260}
            alt="laptop-3d.svg"
            className="w-[170px] md:w-[260px] select-none"
          />

          <h1 className="text-white font-normal text-[22px] md:text-[27px] lg:text-[37px] ">
            Read, Search, Interact
          </h1>
        </div>
      </div>


    {/**CIRCLE BACKGROUND */}
      <div className="absolute bottom-[-200px] blur-sm bg-blend-soft-light w-full max-w-full h-[1350px] rounded-t-[600px] -z-20  bg-gradient-to-b from-[#F9EDF8] via-[#96A4EE] to-[#804da7] opacity-[15%]" />
      <div className="absolute bottom-[-200px] blur-md bg-blend-soft-light w-full max-w-full h-[1250px] rounded-t-[600px]  -z-20 bg-gradient-to-b from-[#F9EDF8] via-[#96A4EE] to-[#804da7] opacity-[20%]" />
      <div className="absolute bottom-[-200px] blur-lg bg-blend-light w-full max-w-full h-[1160px] rounded-t-[600px]  -z-20 bg-gradient-to-b from-[#F9EDF8] via-[#96A4EE] to-[#804da7] opacity-[30%]" /> 
      <div className="absolute bottom-[-200px] blur-xl bg-blend-light w-full max-w-full h-[860px] rounded-t-[600px]  -z-20 bg-gradient-to-b from-[#F9EDF8] via-[#96A4EE] to-[#804da7] opacity-[50%]" /> 
    </motion.div>
  );
};

export default Home;