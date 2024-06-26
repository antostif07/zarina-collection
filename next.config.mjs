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
};

export default nextConfig;
