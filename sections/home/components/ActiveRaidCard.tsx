import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardDescription,
	CardFooter,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Trophy } from "lucide-react";

interface Dungeon {
	name: string;
}

interface Raid {
	id: string;
	dungeon: Dungeon;
	endTime: string;
	rewardTier?: "base" | "silver" | "gold";
	experience?: number;
	tokenAmount?: number;
}

interface ActiveRaidProps {
	raids: Raid[];
	onClaim: (raidId: string) => void;
}

const ActiveRaidCard: React.FC<{
	raid: Raid;
	onClaim: (raidId: string) => void;
}> = ({ raid, onClaim }) => {
	const [timeLeft, setTimeLeft] = useState(0);
	const [progress, setProgress] = useState(100);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date().getTime();
			const endTime = new Date(raid.endTime).getTime();
			const difference = endTime - now;

			if (difference <= 0) {
				clearInterval(interval);
				setTimeLeft(0);
				setProgress(100);
			} else {
				setTimeLeft(difference);
				// Assuming raid duration is 1 hour, adjust as needed
				const hourInMs = 3600000;
				const progressValue = (difference / hourInMs) * 100;
				setProgress(100 - progressValue);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [raid]);

	const getRewardColor = (tier?: string) => {
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

	return (
		<Card className="w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
			<CardHeader className="pb-2">
				<div className="flex justify-between items-center">
					<div className="flex items-center space-x-2">
						<Shield className="h-5 w-5 text-blue-400" />
						<CardTitle className="text-lg font-bold text-gray-100">
							{raid.dungeon.name}
						</CardTitle>
					</div>
					<Trophy className={`h-5 w-5 ${getRewardColor(raid.rewardTier)}`} />
				</div>
			</CardHeader>
			<CardContent className="pb-2">
				<div className="space-y-2">
					<div className="flex justify-between items-center text-sm text-gray-400">
						<div className="flex items-center">
							<Clock className="h-4 w-4 mr-1" />
							{timeLeft > 0 ? (
								<span>
									{Math.floor(timeLeft / 60000)}m{" "}
									{Math.floor((timeLeft % 60000) / 1000)}s
								</span>
							) : (
								<span>Completed!</span>
							)}
						</div>
						<span>{Math.round(progress)}%</span>
					</div>
					<Progress value={progress} className="h-2 bg-gray-700" />
				</div>
			</CardContent>
			<CardFooter className="pt-2">
				<div className="w-full space-y-2">
					<div className="flex justify-between text-sm text-gray-400">
						<span>XP: {raid.experience || 0}</span>
						<span>Tokens: {raid.tokenAmount || 0}</span>
					</div>
					{timeLeft <= 0 && (
						<Button
							onClick={() => onClaim(raid.id)}
							className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0"
						>
							Claim Rewards
						</Button>
					)}
				</div>
			</CardFooter>
		</Card>
	);
    };
export default ActiveRaidCard
