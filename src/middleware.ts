import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  (_req) => {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*", "/roadmaps/:path*"],
};
