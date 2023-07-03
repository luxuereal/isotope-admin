/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['getttthumbnail-dvstskdbbq-uc.a.run.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hpfulxigoxfwocrpkzos.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      }
    ],
  }
}

module.exports = nextConfig
