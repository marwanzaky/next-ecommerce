import "./globals.scss";
import AppProviders from "@redux/appProviders";
import AppStateInit from "@components/appStateInit";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
	title: "Mamolio",
	description: "eCommerce",
	manifest: "/manifest.json",
	keywords: ["ecommerce", "technology", "web application"],
	viewport:
		"minimum-scale=1, initial-scale=1, width=device-width, shrink-to-     fit=no, viewport-fit=cover",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<AppProviders>
					<AppStateInit />
					<Analytics />
					<SpeedInsights />
					{children}
				</AppProviders>
			</body>
		</html>
	);
}
