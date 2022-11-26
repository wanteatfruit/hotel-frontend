/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    remotePatterns: [
      {
        protocol:'https',
        hostname: 'images.pexels.com'
      },
      {
        protocol:'https',
        hostname:'images.unsplash.com'
      },
      {
        protocol:'http',
        hostname:'dummyimage.com'
      },
    ]
  },

}

module.exports = nextConfig
