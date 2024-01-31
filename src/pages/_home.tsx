

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from 'next/image'
import React from "react";
import { CheckCircle2 } from 'lucide-react';


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

  /**LANDING PAGE */
  return (
   <div>
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
        <div className="w-full border  mt-[190px] h-[400px] my-auto items-center flex mb-6 ">
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
                 <p className="md:text-[36px] lg:text-[40px] text-lg leading-normal text-pretty text-[#362D73]">Working with AI to enhance your prompts and for accurate results.</p>
               </div>
           </div>
        </div>


        {/**THIRD CONTENT*/}

        <div className="w-full mt-[20px] md:mt-[120px]">
           <section className="py-[35px] flex flex-col items-center gap-2">
                <h1 className="text-primaryColor text-[25px] md:text-4xl">See features in action</h1>

                <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-[60px] px-[10px] md:p-[20px] lg:px-[30px] justify-around mx-auto grid-rows-2 items-center w-full">
                    {/**MAPPING THE FEATURES HERE */}
                   {features.map((item, index) => (
                      <div key={index} className="p-[20px] flex justify-between items-center border-[#A781F5] border h-[110px] rounded-lg">
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
                </div>
           </section>
        </div>
    </main>

     <div className="w-full md:px-4 flex h-[500px] bg-[#9A8DCD] mt-[175px]">
        <div className="w-full justify-around flex flex-col md:flex-row items-center">
         
            <h1 className="text-white text-3xl mt-7 lg:text-5xl">Read, Search, Interact</h1>
      

           <div className="flex px-2 justify-around gap-6 sm:gap-8 md:gap-[20px] rounded-md w-auto max-h-[400px]">
             <Image 
               width={470}
               height={300}
               sizes="100vw"
               src={'/Desktop - content.png'}
               alt="preview desktop"
               className="self-start w-[350px] md:w-[420px] lg:w-[440px] xl:w-[490px] rounded-lg shadow-xl"
               quality={100}
             />

           <Image 
               width={200}
               height={390}
               sizes="100vw"
               quality={100}
               
               src={'/Mobile.png'}
               alt="preview desktop"
               className="self-center w-[150px] md:w-[200px] mt-[30px] rounded-lg shadow-xl"
             />
           </div>   
         </div>
     </div>
  </div> 
  );
};

export default Home;
