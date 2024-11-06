import { NextRequest, NextResponse } from "next/server";

// type SearchResultItem = {
//   title: string;
//   link: string;
//   description: string;
//   // 필요에 따라 추가 필드...
// };

// type NaverResponse = {
//   lastBuildDate: string;
//   total: number;
//   start: number;
//   display: number;
//   items: SearchResultItem[];
// };

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { message: "Invalid query parameter" },
      { status: 400 },
    );
  }

  // const clientId = process.env.NAVER_CLIENT_ID;
  // const clientSecret = process.env.NAVER_CLIENT_SECRET;

  // if (!clientId || !clientSecret) {
  //   return NextResponse.json({ message: 'Naver API credentials are not set' }, { status: 500 });
  // }

  const apiUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(
    query,
  )}&display=5&sort=random`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Naver-Client-Id": "yY0HmuEeAdiJVtNu0TzZ",
        "X-Naver-Client-Secret": "G8pCmKz8ko",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Naver API Error:", errorData);
      return NextResponse.json(
        {
          message:
            errorData.errorMessage || "Naver API 요청 중 오류가 발생했습니다.",
        },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Naver API Error:", error.message);
    return NextResponse.json(
      {
        message: "Naver API 요청 중 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
