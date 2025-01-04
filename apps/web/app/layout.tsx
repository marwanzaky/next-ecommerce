"use client";

import Navigation from "../components/navigation";
import { ReduxProvider } from "../redux/provider";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import "./globals.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 60 * 24,
		},
	},
});

const persister = createSyncStoragePersister({
	storage: window.localStorage,
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background antialiased font-sans",
					GeistMono.variable,
					GeistSans.variable,
				)}
			>
				<PersistQueryClientProvider
					client={queryClient}
					persistOptions={{ persister }}
				>
					<div className="max-w-5xl mx-auto">
						<ReduxProvider>
							<Navigation />
							{children}

							<nav className="bg-white dark:bg-black flex justify-between items-center h-16 px-8">
								<div></div>
								<ul className="flex gap-8">
									<NavItem>About</NavItem>
									<NavItem>Privacy Policy</NavItem>
									<NavItem>Licensing</NavItem>
									<NavItem>Contact</NavItem>
								</ul>
							</nav>

							<div className="px-8 h-24 flex items-center text-slate-500 border-t text-sm">
								© 2024 Mamolio, Inc. All rights reserved.
							</div>

							<Toaster />
						</ReduxProvider>
					</div>
				</PersistQueryClientProvider>
			</body>
		</html>
	);
}

function NavItem(props: {
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
	return (
		<a
			className="text-sm cursor-pointer text-slate-500 text-nowrap"
			onClick={props.onClick}
		>
			{props.children}
		</a>
	);
}
