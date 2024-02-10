import React from 'react'
import { getXataClient } from '../../src/xata'


export default async function page() {
    const client = getXataClient()
    const data = await client.db.document.getMany({
        sort: 'xata.createdAt'
    })

  return (
    <div>
       {data.map((item) => 
         <div key={item.id}>
             <h1>{item.docname}</h1>
             <p>{item.questions?.id}</p>
             <p>{item.userid}</p>
         </div>
       )}
    </div>
  )
}
