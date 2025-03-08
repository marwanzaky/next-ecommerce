"use client";

import { ReduxProvider } from "../redux/provider";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import "./globals.scss";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 60 * 24,
		},
	},
});

const persister = createSyncStoragePersister({
	storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<PersistQueryClientProvider
					client={queryClient}
					persistOptions={{ persister }}
				>
					<ReduxProvider>{children}</ReduxProvider>
				</PersistQueryClientProvider>
			</body>
		</html>
	);
}
