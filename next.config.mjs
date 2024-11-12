/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },

  compiler: {
    styledComponents: true,
  },

  images: {
    domains: [
      "meemong-uploads.s3.ap-northeast-2.amazonaws.com",
      "meemong-job-storage.s3.ap-northeast-2.amazonaws.com",
      "meemong-job-storage.s3.ap-northeast-2.amazonaws.comnull",
      "meemong-job-storage.s3.ap-northeast-2.amazonaws.comundefined",
      "lh3.googleusercontent.com",
      "k.kakaocdn.net"
    ], // 허용할 도메인 추가
  },
};

export default nextConfig;
