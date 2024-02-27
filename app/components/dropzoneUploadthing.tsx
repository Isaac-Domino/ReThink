"use client";
 
import { UploadButton, UploadDropzone } from "@/lib/uploadthing"; 
import "@uploadthing/react/styles.css";


function formatKey(key: string) {
   return key.substring(0, key.lastIndexOf('.'));
}
export default function DropzoneUpload() {
  return (
    <main className=" ">
      <UploadDropzone
        endpoint="documentUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Filesfsfsfsf: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        className=""
      />
    </main>
  );
}