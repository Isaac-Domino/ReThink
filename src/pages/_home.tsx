import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from 'next/image'
import React from "react";


const Home = () => {
  /**LANDING PAGE */
  return (
    <main className="w-full z-10 px-8 md:px-[60px] py-4 lg:px-[90px] min-w-full h-auto min-h-screen relative">
        <div className="">
            <Navbar />
          {/**HERO SECTION */}
          <section className="mt-[120px] mb-[130px] flex items-center justify-between px-2 py-2  w-full">
             {/**LEFT CONTENT */}
               <div className="text-center items-center md:items-start flex-1 mx-auto md:mx-0 w-[220px] sm:w-auto max-w-[650px] font-bold md:text-left flex flex-col gap-6"> 
                 <div className="flex gap-2 flex-col">  
                   <p className="text-[25px] leading-normal md:text-[42px] text-pretty">Re 
                   <span className="bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700 text-transparent bg-clip-text">
                        Think
                   </span>- document content searcher</p>
                              
                     <span className="text-pretty text-sm md:text-[18px] font-light"> Stop Wasting Time, ReThink Your PDF: Quickly Find Exactly What You Need</span>               
                   </div>

                     <button className="text-white bg-accentColor w-[100px] sm:w-[135px] sm:h-[45px] shadow-md text-[18px] hover:bg-purple-500 transition-colors duration-150 ease-in-out h-[30px] text-sm font-normal">Get started</button>
                </div>

                {/**RIGHT CONTENT */}
                <div className="hidden md:block">
                    <Image 
                      width={450}
                      height={300}
                      src={'/3d-casual-life-young-man-pointing-on-contract 1.svg'}
                      alt="3d image"        
                    />
                </div>
          </section>
        </div>

        <div className="h-full w-full -z-10 absolute top-0 left-0 "style={{ backgroundImage: "url('backround mobile.png')", backgroundPosition: 'top-left',  backgroundRepeat: 'no-repeat'}} /> 


        {/**SECOND CONTENT */}
        <div className="w-full h-[400px] my-auto items-center flex mb-6 ">
           <div className="flex gap-8 justify-between w-full h-auto items-center">
               <div className="flex-1 h-full">
                  <Image 
                   width={350}
                   height={400}
                   src={'/sammy-line-woman-on-skateboard-with-file-folders.gif'}
                   alt=""
                  />
               </div>

               <div className=" flex-1 w-auto h-auto">
                 <p className="md:text-[36px] text-sm leading-normal text-pretty text-[#362D73]">Working with AI to enhance your prompts and for accurate results.</p>
               </div>
           </div>
        </div>
      
      </main>
  );
};

export default Home;
