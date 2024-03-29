'use client'

import React, { useState, useCallback } from 'react'
import { useResizeObserver } from '@wojtekmaj/react-hooks'

const maxWidth = 1290;
const resizeObserverOptions = {};


export default function DocumentFile({ selectedFile }: { selectedFile: string | null | undefined }) {
    const [containerWidth, setContainerWidth] = useState<number>();
    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
    

    //automatically resizing
    const onResize = useCallback<ResizeObserverCallback>((entries) => {
      const [entry] = entries;
  
      if (entry) {
        setContainerWidth(entry.contentRect.width);
        console.log(containerWidth)
      }
    }, []);
  
     useResizeObserver(containerRef, resizeObserverOptions, onResize);

  return (
    <div ref={setContainerRef} className={`w-full h-full relative`}>
     <iframe
        src={`https://docs.google.com/gview?url=${selectedFile}&embedded=true`} // Replace with the URL or path to your document
        title="Document Viewer"
        width="100%"
        height="100%"
        loading='lazy'
      />
  </div>
  ) 
}