'use client'

import React, { useState, useCallback } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useResizeObserver } from '@wojtekmaj/react-hooks'


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  
const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 1290;
const resizeObserverOptions = {};


export default function DocumentFile({ selectedFile }: any) {
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
    <div ref={setContainerRef} className='w-full h-auto relative'>
     <Document
       file={selectedFile}
       onLoadSuccess={onDocumentLoadSuccess}
       loading={() => <p>Loading document</p>}
       className={'absolute top-0 left-0'}
       options={options}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          className={'w-full'}
          width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
        />
      ))}
    </Document>
  </div>
  )
}