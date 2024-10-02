"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function QueryClientWrapper({ children }: any) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
