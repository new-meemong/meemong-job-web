import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl.clone();
  const userId = request.nextUrl.searchParams.get("userId");
  console.log("middleware response", response);
  console.log("middleware url", url);
  console.log("middleware userId", userId);
  if (userId) {
    url.searchParams.set("userId", userId);
  }
  return response;
}

export const config = {
  matcher: ["/", "/home"]
};
