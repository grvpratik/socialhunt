"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { cn, storage } from "@/lib/utils";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useTelegramTheme } from "@/features/telegram/hooks/useTelegamTheme";
import { Button } from "@/components/ui/button";
import WebLanding from "@/sections/web/components/landing";
import { ApiService } from "@/features/api/utils";
// import { ApiService } from "@/features/fetching/utils";

// Types
type UserEnvironment = "loading" | "telegram" | "external";

interface SessionResponse {
	token: string;
	success: boolean;
	user?: {
		id: string;
		username?: string;
		// Add other user properties as needed
	};
}

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

const inter = Inter({ subsets: ["latin"] });

// Constants
const LOCAL_STORAGE_KEYS = {
	TOKEN: "app_token",
} as const;



class AuthError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "AuthError";
	}
}

const HomePage: React.FC = () => {
	const { setTheme } = useTheme();
	const telegramTheme = useTelegramTheme();
	const [userEnvironment, setUserEnvironment] =
		useState<UserEnvironment>("loading");
	const [authState, setAuthState] = useState<AuthState>({
		isAuthenticated: false,
		isLoading: true,
		error: null,
	});
	const router = useRouter();

	useEffect(() => {
		setTheme(telegramTheme);
		void checkEnvironmentAndAuth();
	}, [telegramTheme, setTheme]);

	const checkEnvironmentAndAuth = async (): Promise<void> => {
		try {
			await checkEnvironment();
			await checkExistingSession();
		} catch (error) {
			console.error("Initialization error:", error);
			setAuthState((prev) => ({
				...prev,
				isLoading: false,
				error:
					error instanceof Error ? error.message : "An unknown error occurred",
			}));
		}
	};

	const checkEnvironment = async (): Promise<void> => {
		try {
			const WebApp = (await import("@twa-dev/sdk")).default;
			const environment: UserEnvironment = WebApp.initDataUnsafe.user
				? "telegram"
				: "external";
			setUserEnvironment(environment);
		} catch (error) {
			console.log("Not in Telegram Web App environment");
			setUserEnvironment("external");
		}
	};

	const checkExistingSession = async (): Promise<void> => {
		const existingToken = storage.getToken();

		if (!existingToken) {
			setAuthState((prev) => ({ ...prev, isLoading: false }));
			return;
		}

		try {
			const isValid = await verifyToken(existingToken);
			setAuthState({
				isAuthenticated: isValid,
				isLoading: false,
				error: null,
			});

			if (isValid) {
				router.push("/home");
			}
		} catch (error) {
			storage.removeToken();
			setAuthState({
				isAuthenticated: false,
				isLoading: false,
				error:
					error instanceof AuthError
						? error.message
						: "Session verification failed",
			});
		}
	};

	const verifyToken = async (token: string): Promise<boolean> => {
		try {
			const response = await ApiService.verifySession(token);
			return response.success;
		} catch (error) {
			throw new AuthError("Token verification failed");
		}
	};

	const handleAuth = async (): Promise<void> => {
		setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

		try {
			const response: SessionResponse = await ApiService.getSession();

			if (response.success && response.token) {
				storage.setToken(response.token);
				setAuthState({
					isAuthenticated: true,
					isLoading: false,
					error: null,
				});
				router.push("/home");
			} else {
				throw new AuthError("Authentication failed");
			}
		} catch (error) {
			setAuthState({
				isAuthenticated: false,
				isLoading: false,
				error:
					error instanceof AuthError
						? error.message
						: "An error occurred during authentication",
			});
		}
	};

	const renderContent = () => {
		if (authState.isLoading) {
			return (
				<div className="flex justify-center items-center h-screen">
					<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
				</div>
			);
		}

		if (userEnvironment === "telegram") {
			return (
				<>
					<h1 className={cn("text-5xl font-extrabold text-balance my-4")}>
						Get <br /> Rewarded <br /> for your contribution
					</h1>
					<Button
						className={cn(
							"font-medium py-2 group relative overflow-hidden tracking-widest rounded-full"
						)}
						onClick={handleAuth}
						disabled={authState.isLoading}
					>
						{authState.isLoading ? "Logging in..." : "Login with Telegram"}
					</Button>
					{authState.error && (
						<p className="text-red-500 mt-2">{authState.error}</p>
					)}
				</>
			);
		}

		return <WebLanding />;
	};

	return (
		<div
			className={cn(
				"w-full h-screen p-4 flex flex-col justify-center items-center relative overflow-x-hidden",
				userEnvironment === "telegram" && "justify-end items-stretch"
			)}
		>
			{renderContent()}
		</div>
	);
};

export default HomePage;

// ApiService enhancement (in your ApiService file)
// export class ApiService {
// 	static async getSession(): Promise<SessionResponse> {
// 		try {
// 			const response = await fetch("/api/auth/session", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 			});

// 			if (!response.ok) {
// 				throw new Error("Failed to get session");
// 			}

// 			return await response.json();
// 		} catch (error) {
// 			throw new AuthError(
// 				error instanceof Error ? error.message : "Failed to get session"
// 			);
// 		}
// 	}

// 	static async verifySession(token: string): Promise<SessionResponse> {
// 		try {
// 			const response = await fetch("/api/auth/verify", {
// 				method: "GET",
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 				},
// 			});

// 			if (!response.ok) {
// 				throw new Error("Invalid session");
// 			}

// 			return await response.json();
// 		} catch (error) {
// 			throw new AuthError(
// 				error instanceof Error ? error.message : "Session verification failed"
// 			);
// 		}
// 	}
// }
{
	/* <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div> */
}
