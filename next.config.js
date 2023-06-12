/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hpfulxigoxfwocrpkzos.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/photos/public/**',
      },
    ],
  }
}

module.exports = nextConfig
