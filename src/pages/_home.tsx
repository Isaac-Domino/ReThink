import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from 'next/image'
import React from "react";
import { CheckCircle2 } from 'lucide-react';

const Home = () => {
  /**LANDING PAGE */
  return (
    <main className="w-full z-10 px-2 sm:px-8 md:px-[60px] py-4 lg:px-[90px] min-w-full h-auto min-h-screen relative">
        <div className="">
            <Navbar />
          {/**HERO SECTION */}
          <section className="mt-[120px] text-white mb-[130px] flex items-center justify-between px-2 py-2  w-full">
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

          
        <Image 
          src={'/backround gradient.png'}
          alt="background"
          className="absolute h-[550px] sm:h-[500px] w-[1000px] object-center bg-center md:w-[2000px] md:h-[700px] top-0 left-0 -z-10"
          quality={100}
          width={2000}
          height={1000}
          style={{
            objectFit: 'cover'
          }}
        />
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


        {/**THIRD CONTENT*/}

        <div className="w-full mt-[20px] md:mt-[120px]">
           <section className="py-[35px] flex flex-col items-center gap-2">
                <h1 className="text-primaryColor text-[25px] md:text-4xl">See features in action</h1>

                <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 gap-6 mt-[60px] px-[10px] md:p-[20px] lg:px-[30px] justify-around mx-auto grid-rows-2 items-center w-full">
                     <div className="p-[20px] flex justify-between items-center border-[#A781F5] border h-[90px] rounded-lg">
                         <div className="flex w-[250px] sm:w-[350px] md:w-[500px] gap-4 items-center">
                           <CheckCircle2 
                             color="white"
                             size={32}
                             className="bg-secondaryColor text-md  rounded-full"
                           /> 

                             <div>
                                <h3 className="text-[20px] md:text-2xl">File conversion</h3>
                                <span className="font-light text-[12px] sm:text-[15px] md:text-[18px]">Automatically convert any document file to .pdf</span>
                             </div>
                         </div>

                         <div>
                            <Image 
                             src={'/upload.svg'}
                             width={40}
                             height={40}
                             alt="upload icon"
                            />
                         </div>
                     </div>
                     <div className="p-[20px] bg-slate-400">
                         first item
                     </div>
                     <div className="p-[20px] bg-slate-700">
                         first item
                     </div>
                     <div className="p-[20px] bg-slate-800">
                         first item
                     </div>
                </div>
           </section>
        </div>

    </main>
  );
};

export default Home;
