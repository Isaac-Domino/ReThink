'use client'

import React, { useState, useCallback } from 'react'
import { pdfjs, Document, Page, PageProps } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useResizeObserver } from '@wojtekmaj/react-hooks'
import { savedDataDbType } from '../../types';
import { Loader2 } from 'lucide-react';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  
const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 1290;
const resizeObserverOptions = {};


export default function DocumentFile({ selectedFile }: { selectedFile: string | null | undefined }) {
    const [numPages, setNumPages] = useState(null);
    const [containerWidth, setContainerWidth] = useState<number>();
    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
    

    //automatically resizing
    const onResize = useCallback<ResizeObserverCallback>((entries) => {
      const [entry] = entries;
  
      if (entry) {
        setContainerWidth(entry.contentRect.width);
        console.log(entry)
      }
    }, []);
  
     useResizeObserver(containerRef, resizeObserverOptions, onResize);

    function onDocumentLoadSuccess ({ numPages }: { numPages: number | any }): void {
        setNumPages(numPages);
        console.log(numPages);
    };

  return (
    <div ref={setContainerRef} className='w-full h-full relative'>
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