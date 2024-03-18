import { createRouteHandler } from "uploadthing/next-legacy";
 
import { ourFileRouter } from "@/server/uploadthing";
 
export default createRouteHandler({
  router: ourFileRouter,
  config: { 
      uploadthingId: process.env.UPLOADTHING_APP_ID,
      uploadthingSecret: process.env.UPLOADTHING_SECRET
  },
});