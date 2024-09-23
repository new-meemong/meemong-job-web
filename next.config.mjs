/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },

  compiler: {
    styledComponents: true,
  },

  images: {
    domains: ['meemong-job-storage.s3.ap-northeast-2.amazonaws.com'], // 허용할 도메인 추가
  },
};

export default nextConfig;
