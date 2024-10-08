"use client";
import React, { useState } from "react";
import {
	Timer,
	Sword,
	Trophy,
	Sparkles,
	CopyIcon,
	ExternalLink,
} from "lucide-react";
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import TokenInfo from "./TokenInfo";

interface Reward {
	tokenAmount: number;
}

interface RewardDisplayProps {
	tier: "diamond" | "gold" | "silver" | "base";
	reward: Reward;
}

const getTierColor = (tier: string) => {
	switch (tier) {
		case "diamond":
			return "text-cyan-500";
		case "gold":
			return "text-yellow-500";
		case "silver":
			return "text-gray-400";
		default:
			return "text-bronze-500";
	}
};

const getTierGradient = (tier: string) => {
	switch (tier) {
		case "diamond":
			return "bg-gradient-to-r from-cyan-100 to-cyan-200 border-cyan-300";
		case "gold":
			return "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300";
		case "silver":
			return "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300";
		default:
			return "bg-gradient-to-r from-orange-100 to-orange-200 border-orange-300";
	}
};

const RewardDisplay: React.FC<RewardDisplayProps> = ({ tier, reward }) => (
	<div
		className={`flex items-center justify-between p-3 border rounded-lg ${getTierGradient(
			tier
		)} transition-all hover:scale-105`}
	>
		<div className="flex items-center">
			<Trophy className={`mr-2 h-5 w-5 ${getTierColor(tier)}`} />
			<span className="font-semibold text-gray-700">
				{tier.charAt(0).toUpperCase() + tier.slice(1)}
			</span>
		</div>
		<div className="flex items-center">
			<span className="font-bold mr-1">{reward.tokenAmount}</span>
			<span className="text-gray-600">tokens</span>
		</div>
	</div>
);

interface DungeonCardProps {
	dungeon: any;
	userLevel?: number;
	onEnter: (dungeonId: string) => void;
}

export default function DungeonCard({
	dungeon,
	userLevel,
	onEnter,
}: DungeonCardProps) {
	const [showRewards, setShowRewards] = useState(false);
	const canEnter = userLevel || 12 >= dungeon.minimumLevel;


	return (
		<Card className="overflow-hidden transition-all hover:shadow-lg border-2">
			<CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<h3 className="text-xl font-bold text-gray-800">{dungeon.name}</h3>
						<div className="flex items-center bg-white px-2 py-1 rounded-full border">
							<Sparkles className="h-4 w-4 text-purple-500 mr-1" />
							<span className="text-sm font-medium">
								Level {dungeon.minimumLevel}+
							</span>
						</div>
					</div>

					<TokenInfo address={dungeon.token_ca} />
				</div>
			</CardHeader>

			<CardContent className="pt-4">
				<div className="flex justify-between items-center mb-6">
					<div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
						<Timer className="mr-2 h-5 w-5 text-blue-500" />
						<span className="font-medium">
							{Math.floor(dungeon.timeToComplete / 60)} min
						</span>
					</div>
					<div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
						<Sword className="mr-2 h-5 w-5 text-green-500" />
						<span className="font-medium">{dungeon.entryPoints} tokens</span>
					</div>
				</div>

				<Button
					onClick={() => setShowRewards(true)}
					variant="outline"
					className="w-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all"
				>
					View Potential Rewards
				</Button>

				<Dialog open={showRewards} onOpenChange={setShowRewards}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle className="text-2xl font-bold text-center mb-2">
								Potential Rewards
							</DialogTitle>
							<DialogDescription className="text-center text-gray-600">
								Complete the dungeon to earn these rewards
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4 mt-4">
							<RewardDisplay tier="diamond" reward={dungeon.diamondReward} />
							<RewardDisplay tier="gold" reward={dungeon.goldReward} />
							<RewardDisplay tier="silver" reward={dungeon.silverReward} />
							<RewardDisplay tier="base" reward={dungeon.baseReward} />
						</div>
					</DialogContent>
				</Dialog>
			</CardContent>

			<CardFooter className="bg-gradient-to-r from-purple-50 to-blue-50 mt-4">
				<Button
					onClick={() => onEnter(dungeon.id)}
					disabled={!canEnter}
					className={`w-full py-6 text-lg font-semibold transition-all ${
						canEnter
							? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
							: "bg-gray-100 text-gray-400"
					}`}
				>
					{canEnter ? (
						<span className="flex items-center justify-center">
							<Sword className="mr-2 h-5 w-5" />
							Enter Dungeon
						</span>
					) : (
						`Reach Level ${dungeon.minimumLevel}`
					)}
				</Button>
			</CardFooter>
		</Card>
	);
}
