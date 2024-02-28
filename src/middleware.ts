import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/login",
    "/login/(.*)",
    "/register",
    "/register/(.*)",
    "/projects",
    "/about",
    '/api/uploadthing',
    '/main'
  ],

});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
