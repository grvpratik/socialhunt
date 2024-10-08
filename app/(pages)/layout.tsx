"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTelegram } from "@/features/telegram/provider/telegram-provider";
import AnimatedBackground from "@/components/framer/AnimatedBackground";
import {
	Banknote,
	Coins,
	Component,
	Diamond,
	Home,
	Settings,
	Sword,
	Swords,
	Trophy,
	User,
} from "lucide-react";
import Link from "next/link";
const TABS = [
	{
		label: "Home",
		href: "/home",
		icon: <Home className="h-5 w-5" />,
	},

	{
		label: "Store",
		href: "/shop",
		icon: <Swords className="h-5 w-5" />,
	},
	{
		label: "Earn",
		href: "/earn",
		icon: <Trophy className="h-5 w-5" />,
	},
	{
		label: "About",
		href: "/account",
		icon: <User className="h-5 w-5" />,
	},
];
const TelegramLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const pathname = usePathname();
	// const router = useRouter();
	// // const [isVerifying, setIsVerifying] = useState(true);
	// const { webApp: WebApp } = useTelegram(); // Move hook to component level
	// useEffect(() => {
	// 	console.log("pages Layout");
	// 	if (!WebApp?.initData && !WebApp) {
			
	// 	}
	// }, []);

	

	return (
		<>
			<div className="w-full relative bg-background h-screen">
				{children}
				<div className="fixed bg-transparent    border-solid left-0 right-0 bottom-0 flex items-center h-16  px-4">
					<div className="flex justify-between  w-full space-x-2 rounded-xl border border-zinc-950/10 bg-gray-200 p-2">
						<AnimatedBackground
							defaultValue={pathname}
							className="rounded-lg bg-zinc-400"
							transition={{
								type: "spring",
								bounce: 0.2,
								duration: 0.3,
							}}
						>
							{TABS.map((tab) => (
								<Link
									href={tab.href}
									key={tab.label}
									data-id={tab.href}
									type="button"
									className="inline-flex h-9 w-9 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950"
								>
									{tab.icon}
								</Link>
							))}
						</AnimatedBackground>
					</div>
				</div>
			</div>
		</>
	);
};

export default TelegramLayout;
