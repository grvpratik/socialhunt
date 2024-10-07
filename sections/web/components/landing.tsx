"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Phudu } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const phudu = Phudu({ subsets: ["latin"] });
const WebLanding = () => {
	return (
		<div
			className={cn(
				"w-full h-screen p-4 flex flex-col justify-center items-center relative overflow-x-hidden",
				phudu.className
			)}
		>
			<h1 className="text-4xl font-bold text-balance my-4 text-center">
				Welcome to Our App!
			</h1>
			<p className="mb-4 text-center">
				For the best experience, please open this app in Telegram.
			</p>
			<Button
				className={cn(
					"bg-blue-500 transition duration-150 font-medium tracking-widest rounded-full text-white"
				)}
			>
				<Link target="_blank" href="https://t.me/social_hunt_bot/r3ward">
					Open in Telegram
				</Link>
			</Button>
		</div>
	);
};

export default WebLanding;
