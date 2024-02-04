'use client'

import Navbar from "@/components/Navbar";
import Image from 'next/image'
import React, { useRef } from "react";
import { CheckCircle2 } from 'lucide-react';
import { motion, useScroll } from 'framer-motion'
import Hero from "@/components/Hero";



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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress, } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"]
  });

  /**LANDING PAGE */
  return (
   <motion.div
     initial={{ opacity: 0, y: 100}}
     animate={{ opacity: 1, y: 0}}
     transition={{ ease: "easeOut", type: "tween"}}
   >
      <main className="w-full z-10 px-2 sm:px-8 md:px-[60px] py-4 lg:px-[90px] min-w-full h-auto min-h-screen relative">
        <div className="">
            <Navbar />
        
        {/**HERO SECTION */}
        <Hero />
          
        <Image 
          src={'/backround gradient.png'}
          alt="background"
          className="absolute h-[550px] sm:h-[500px] object-center bg-center w-full md:h-[700px] top-0 left-0 -z-10"
          quality={100}
          sizes="100vw"
          width={2000}
          height={1000}
          style={{
            objectFit: 'cover'
          }}
        />
      </div>
 
        {/**SECOND CONTENT */}
        <motion.div
         ref={ref}
         style={{
           opacity: scrollYProgress
         }}
         transition={{ ease: 'linear',  delay: 1, }}
         
        className="w-full mt-[190px] 
        h-[400px] my-auto items-center flex mb-6"
        >
           <div className="flex gap-8 justify-between w-full h-auto items-center">
               <div className="flex-1 h-full">
                  <Image 
                   width={350}
                   height={400}
                   src={'/sammy-line-woman-on-skateboard-with-file-folders.gif'}
                   alt="animated gif"
                  />
               </div>
 
               <div className=" flex-1 w-auto h-auto">
                 <p className="md:text-[36px] dark:text-white lg:text-[40px] text-lg leading-normal text-pretty text-[#362D73]">Working with AI to enhance your prompts and for accurate results.</p>
               </div>
           </div>
        </motion.div>


        {/**THIRD CONTENT*/}

        <div className="w-full mt-[20px] md:mt-[120px]">
           <section className="py-[35px] flex flex-col items-center gap-2">
                <h1 className="text-primaryColor dark:text-white text-[25px] md:text-4xl">See features in action</h1>

                <motion.div 
                       initial={{ opacity: 0, translateX: -1000 }}
                       whileInView={{ opacity: 1, translateX: 0 }}
                       viewport={{ once: true}}
                       transition={{ delay: 0.6,  ease: "easeInOut", }} className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-[60px] px-[10px] md:p-[20px] lg:px-[30px] justify-around mx-auto grid-rows-2 items-center w-full">
                    {/**MAPPING THE FEATURES HERE */}
               
                   {features.map((item, index) => (
                      <div
                        key={index} className="p-[20px] flex justify-between items-center border-[#A781F5] border h-[110px] rounded-lg">
                    
                       <div className="flex w-[250px] sm:w-[350px] md:w-[500px] max-w-[450px] gap-4 items-center">
                            {item.icon}
                           <div className="flex flex-col gap-2">
                              <h3 className="text-[20px] md:text-2xl">{item.title}</h3>
                              <span className="font-light text-[12px] sm:text-[15px] md:text-[16px] lg:text-[18px]">{item.description}</span>
                           </div>
                       </div>

                       <div>
                          {item.image}
                       </div>
                   </div>
                  ))}
                
                </motion.div>
           </section>
        </div>
    </main>

     <div className="w-full md:px-4 flex h-[700px] sm:h-[500px] md:h-[600px] bg-[#9A8DCD] mt-[175px]">
        <div className="w-full justify-around flex flex-col md:flex-row items-center">
         
            <h1 className="text-white text-3xl mt-7 lg:text-5xl">Read, Search, Interact</h1>
      

           <div className="flex flex-col sm:flex-row px-2 md:justify-around gap-2 sm:gap-6 md:gap-[20px] lg:gap-12 rounded-md w-auto ">
             <Image 
               width={470}
               height={300}
               sizes="100vw"
               src={'/Desktop - content.png'}
               alt="preview desktop"
               className="self-start w-[300px] md:w-[420px] lg:w-[440px] xl:w-[490px] rounded-lg shadow-xl"
               quality={100}
             />

           <Image 
               width={200}
               height={300}
               sizes="100vw"
               quality={100}
               
               src={'/Mobile.png'}
               alt="preview desktop"
               className="self-center w-[150px] md:w-[190px] lg:w-[220px] mt-[30px] rounded-lg shadow-xl"
             />
           </div>   
         </div>
     </div>
  </motion.div> 
  );
};

export default Home;