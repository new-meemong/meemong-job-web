import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl.clone();
  const userId = request.nextUrl.searchParams.get("userId");
  const profileImageUri = request.nextUrl.searchParams.get("profileImageUri");
  const sex = request.nextUrl.searchParams.get("sex");

  console.log("[middleware] userId", userId);
  console.log("[middleware] profileImageUri", profileImageUri);
  console.log("[middleware] sex", sex);
  if (!userId) {
    return NextResponse.json("User id is required.", { status: 400 });
  }

  url.searchParams.set("userId", userId);
  url.searchParams.set("profileImageUri", profileImageUri || "");
  url.searchParams.set("sex", sex || "");

  return response;
}

export const config = {
  matcher: ["/", "/home"]
};
