'use client'

import React, { useState } from 'react'
import axios from 'axios'



export default function Page() {
 
    const [upload, setUpload] = useState<File | null>(null);
    const [ answer, setAnswer ] = useState('')

  async function handleSubmit() {
     const response = await axios({
       data: upload,
       method: 'POST', 
       url: '/api/huggingface',
       headers: {"Content-Type": 'application/json'}
     })

     setAnswer(response.data.dataAnswer);
     console.log(response.data.dataAnswer);
     console.log("Submitted");
  }
  
 console.log(upload)
  return (
    <div>
       <form onSubmit={handleSubmit}>
          <input onChange={(e) => setUpload(e.target?.files ? e.target.files[0] : null)} type="file" placeholder='Insert file'/>
          <button className='bg-slate-700 text-white' type='submit' onSubmit={handleSubmit}>Submit</button>
       </form>

       <p>Answer: {answer}</p>
    </div>
  )
}
