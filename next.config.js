/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["files.edgestore.dev", "images.unsplash.com", "img.freepik.com", "cdn-icons-png.flaticon.com", "pngtree.com", "cdn.pixabay.com", "media.istockphoto.com", "stock.adobe.com", "images.pexels.com", "media.gettyimages.com", "www.notion.so"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.example.com',
                port: '',
                pathname: '/account1234/**',
            },
        ],
    }
}

module.exports = nextConfig
