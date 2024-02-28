import React from 'react'
import { useRouter } from 'next/router'

export default function MainPage() {
    const router = useRouter();

    //get the id from the database EX. rec_055fg32k => /main/rec_055fg32k
  return (
    <div>
      <p>item id: {router.query.slug}</p>
  
    </div>
  );
}
