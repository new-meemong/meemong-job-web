import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl.clone();

  if (url.pathname === "/" || url.pathname === "/home") {
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

    return NextResponse.rewrite(url);
  }

  if (url.pathname === "/my/job-posting-list") {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json("userId is required.", { status: 401 });
    }

    url.searchParams.set("userId", userId);
    console.log("[middleware] userId set to searchParams", userId);

    // 새로운 URL로 리다이렉트 설정
    return NextResponse.rewrite(url);
  }

  if (url.pathname.startsWith("/resume/") && url.pathname.endsWith("/edit")) {
    const userId = request.nextUrl.searchParams.get("userId");

    if (userId) {
      url.searchParams.set("userId", userId);
      console.log(
        "[middleware] userId set to searchParams in resume edit",
        userId,
      );
    }

    // 새로운 URL로 리다이렉트 설정
    return NextResponse.rewrite(url);
  }

  // 기본 응답
  return response;
}

export const config = {
  matcher: ["/", "/home", "/my/job-posting-list", "/resume/:path*/edit"],
};

// "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2pvYi1hcGkubWVlbW9uZy5jb20iLCJpYXQiOjE3MjkyMzY5MDAsInR5cGUiOiJDTElFTlRfQVBQX1VTRVIiLCJpc0RldkRhdGFiYXNlIjpmYWxzZSwiYXBwSWRlbnRpZmllcklkIjpudWxsLCJ1c2VySWQiOjQzNjc3LCJleHAiOjE3MzcwMTI5MDB9.7ThEnaPZDm4B4ZPMeDMiHX9dlgzEpA4qJnvpKfxE9BQ"
