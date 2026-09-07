// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: '**',
//             },
//         ],
//     },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'https',
                hostname: 'static.wikia.nocookie.net',
            },
            {
                protocol: 'https',
                hostname: 'static.wikia.nocookie.net/twicenation',
            },
            {
                protocol: 'https',
                hostname: 'static.wikia.nocookie.net/atiny',
            },
            {
                protocol: 'https',
                hostname: 'static.wikia.nocookie.net/aespa',
            },
        ],
    },
};

export default nextConfig;