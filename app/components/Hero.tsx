import React from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import Link from 'next/link'

const poppins = Poppins( {
  weight: ['300', '400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
})

export default function Hero() {
  return (
      <section className="mt-[20px] md:mt-[40px] text-white flex items-center justify-around  mx-auto px-2 py-2 w-full">
             {/**LEFT CONTENT */}
               <div className={`${poppins.className} text-center items-center md:items-start  font-bold md:text-left flex flex-col gap-3`}> 
                 <div className=" max-w-[400px] ">  
                   <h1 className="text-[46px] leading-relaxed sm:text-[55px] md:text-[66px] font-bold ">
                     Re 
                    <span className="bg-gradient-to-b from-purple-500 via-purple-400 to-purple-200 text-transparent bg-clip-text">
                        Think
                    </span>
                   </h1>       
                     <span className="text-pretty truncate text-ellipsis text-[24px] sm:text-[28px] md:text-[32px] font-medium">document content searcher</span>               
                   </div>
                         <button className="text-white group text-center border border-[#C86BDC] rounded-xl w-[100px] sm:w-[145px] h-[40px] sm:h-[50px] 
                             shadow-md text-[18px] md:text-[20px] 
                             hover:bg-white transition-colors duration-150 ease-in-out items-center text-sm font-normal">
                              <Link href={'/projects'}>  
                                <span className='text-purple-200 text-md md:text-lg group-hover:text-[#c86bdc]'>Get started</span>
                              </Link>
                         </button>
                 </div>

                {/**RIGHT CONTENT */}
                <div className="hidden md:block w-auto ">
                    <Image 
                      width={425}
                      height={400}
                      src={'/books-and-search.svg'}
                      alt="3d image"      
                      priority  
                      className='select-none'
                    />
                </div>
          </section> 
     )
}