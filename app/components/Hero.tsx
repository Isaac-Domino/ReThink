import React from 'react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { Poppins } from 'next/font/google'
import Link from 'next/link'

const poppins = Poppins( {
  weight: ['300', '400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
})

export default function Hero() {
  return (
    <section className="mt-[120px] text-white mb-[130px] flex items-center justify-between px-2 py-2  w-full">
             {/**LEFT CONTENT */}
               <div className={`${poppins.className} text-center items-center md:items-start flex-1 mx-auto md:mx-0 w-[220px] sm:w-auto max-w-[650px] font-bold md:text-left flex flex-col gap-6`}> 
                 <div className="flex gap-2 flex-col">  
                   <p className="text-[30px] leading-normal md:text-[42px] text-pretty">Re 
                   <span className="bg-gradient-to-b from-purple-500 via-purple-400 to-purple-200 text-transparent bg-clip-text">
                        Think
                   </span>- document content searcher</p>
                              
                     <span className="text-pretty text-sm md:text-[18px] font-light"> Stop Wasting Time, ReThink Your PDF: Quickly Find Exactly What You Need</span>               
                   </div>

                    
                         <button className="text-white text-center bg-accentColor w-[100px] sm:w-[145px] sm:h-[50px] 
                            rounded-sm shadow-md text-[18px] md:text-[22px] 
                             hover:bg-purple-500 transition-colors duration-150 ease-in-out h-[30px] items-center text-sm font-normal">
                             <Link href={'/archives'}>  
                                Get started  
                             </Link>
                         </button>
                 </div>

                {/**RIGHT CONTENT */}
                <div className="hidden md:block">
                    <Image 
                      width={400}
                      height={300}
                      src={'/3d-casual-life-young-man-pointing-on-contract 1.svg'}
                      alt="3d image"      
                      priority  
                    />
                </div>
          </section> 
     )
}