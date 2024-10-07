"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type {
	ITelegramUser,
	IWebApp,
} from "@/features/telegram/types/telegram";
import { ApiService } from "@/features/api/utils";

export interface ITelegramContext {
	webApp?: IWebApp;
	user?: ITelegramUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [webApp, setWebApp] = useState<IWebApp | null>(null);

	useEffect(() => {
		const app = (window as any).Telegram?.WebApp;
		if (app) {
			app.ready();

			setWebApp(app);
			ApiService.setAuthToken(app.initData);
		}
	}, []);

	const value = useMemo(() => {
		return webApp
			? {
					webApp,
					unsafeData: webApp.initDataUnsafe,
					user: webApp.initDataUnsafe.user,
			  }
			: {};
	}, [webApp]);

	return (
		<TelegramContext.Provider value={value}>
			{children}
		</TelegramContext.Provider>
	);
};

export const useTelegram = () => useContext(TelegramContext);
