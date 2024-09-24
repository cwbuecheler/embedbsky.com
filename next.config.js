/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	trailingSlash: true,
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
};

export default nextConfig;
