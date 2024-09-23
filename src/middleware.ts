import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl.clone();
  const userId = request.nextUrl.searchParams.get("userId");

  console.log("middleware userId", userId);
  if (!userId) {
    return NextResponse.json("User id is required.", { status: 400 });
  }

  url.searchParams.set("userId", userId);

  return response;
}

export const config = {
  matcher: ["/", "/home"]
};
