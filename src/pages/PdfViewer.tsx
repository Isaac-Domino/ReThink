'use client'


import React, { useState} from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();


export default function PdfViewer( { selectedFile }) {
   const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess ({ numPages }: { numPages: number | null}): void {
        setNumPages(numPages);
        console.log(numPages);
    };
  
       
  return (
    <div className='w-full h-auto relative'>
     <Document
       file={selectedFile}
       onLoadSuccess={onDocumentLoadSuccess}
       loading={() => <p>Loading document</p>}
       className={'absolute top-0 left-0'}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          className={'w-full'}
        />
      ))}
    </Document>
  </div>
  )
}
