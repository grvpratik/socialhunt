"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTelegram } from "@/features/telegram/provider/telegram-provider";
import AnimatedBackground from "@/components/framer/AnimatedBackground";
import { Banknote, Coins, Home, Settings, User } from "lucide-react";
const TABS = [
	{
		label: "Home",
		icon: <Home className="h-5 w-5" />,
	},
	
	{
		label: "Services",
		icon: <Settings className="h-5 w-5" />,
	},
	{
		label: "Earn",
		icon: <Coins className="h-5 w-5" />,
	},{
		label: "About",
		icon: <User className="h-5 w-5" />,
	},
];
const WebLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const router = useRouter();
	const [isVerifying, setIsVerifying] = useState(true);
	const { webApp: WebApp } = useTelegram(); // Move hook to component level

	useEffect(() => {
		const checkEnvironment = async () => {
			try {
				if (WebApp?.initDataUnsafe.user && WebApp?.initData) {
					router.push("/home");
					return;
				}

				setIsVerifying(false);
			} catch (error) {
				console.error("Error checking Telegram environment:", error);
				setIsVerifying(false);
			}
		};

		checkEnvironment();
	}, [ router]); // Add WebApp to dependencies

	if (isVerifying) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	return (
		<>
			

			{/* <div className="w-full relative bg-background h-screen"> */}
				{children}
				{/* <div className="fixed bg-transparent    border-solid left-0 right-0 bottom-0 flex items-center h-16  px-4">
					<div className="flex justify-between  w-full space-x-2 rounded-xl border border-zinc-950/10 bg-gray-200 p-2">
						<AnimatedBackground
							defaultValue={TABS[0].label}
							className="rounded-lg bg-zinc-400"
							transition={{
								type: "spring",
								bounce: 0.2,
								duration: 0.3,
							}}
						>
							{TABS.map((tab) => (
								<button
									key={tab.label}
									data-id={tab.label}
									type="button"
									className="inline-flex h-9 w-9 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950"
								>
									{tab.icon}
								</button>
							))}
						</AnimatedBackground>
					</div>
				</div>
			</div> */}
		</>
	);
};

export default WebLayout;
