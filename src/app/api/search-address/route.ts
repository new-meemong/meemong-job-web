// src/app/api/search-address/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword");

  if (!keyword) {
    return NextResponse.json(
      { message: "Invalid keyword parameter" },
      { status: 400 },
    );
  }

  const apiUrl = `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=U01TX0FVVEgyMDI0MTEyOTEzNDYxNjExNTI4NDc=&keyword=${encodeURIComponent(
    keyword,
  )}&currentPage=1&countPerPage=10&resultType=json`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Address API Error:", errorData);
      return NextResponse.json(
        {
          message:
            errorData.errorMessage || "주소 API 요청 중 오류가 발생했습니다.",
        },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Address API Error:", error.message);
    return NextResponse.json(
      {
        message: "주소 API 요청 중 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
