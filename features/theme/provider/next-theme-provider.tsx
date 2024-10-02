"use client";

import { useTelegramTheme } from "@/features/telegram/hooks/useTelegamTheme";
import { ThemeProvider } from "next-themes";


export function Providers({ children }: { children: React.ReactNode }) {
	const theme = useTelegramTheme();

	return (
		<ThemeProvider attribute="class" defaultTheme={theme}>
			{children}
		</ThemeProvider>
	);
}
