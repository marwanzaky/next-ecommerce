/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [process.env.NEXT_PUBLIC_DOMAINS, "tailwindui.com"],
		formats: ["image/avif", "image/webp"],
	},
};

module.exports = nextConfig;
