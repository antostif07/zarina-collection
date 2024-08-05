/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'pyiurs.com',
            port: '',
            pathname: '/catalog/zarina_images/**',
          },
        ],
      },
      distDir: "_next"
};

export default nextConfig;
