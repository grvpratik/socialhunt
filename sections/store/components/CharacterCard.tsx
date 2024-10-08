import React from "react";
import { Shield, Sword, Wand } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const calculateExpToNextLevel = (level: number): number =>
	100 * Math.pow(2, level - 1);

interface CharacterCardProps {
	type: "knight" | "mage" | "beast";
	name: string;
	level: number;
	exp: number;
}

const characterIcons = {
	knight: Sword,
	mage: Wand,
	beast: Shield,
};

const characterColors = {
	knight: "text-red-500",
	mage: "text-blue-500",
	beast: "text-green-500",
};

const ExpBar: React.FC<{ current: number; max: number }> = ({
	current,
	max,
}) => {
	const percentage = Math.min((current / max) * 100, 100);

	return (
		<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
			<div
				className="h-2.5 rounded-full transition-all duration-500"
				style={{
					width: `${percentage}%`,
					backgroundColor: "currentColor",
				}}
			/>
		</div>
	);
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
	type,
	name,
	level,
	exp,
}) => {
	const queryClient = useQueryClient();
	const Icon = characterIcons[type];
	const colorClass = characterColors[type];
	const expForNextLevel = calculateExpToNextLevel(level);

	// const { mutate: gainExp, isLoading } = useMutation({
	// 	mutationFn: () =>
	// 		updateCharacterExp(type, Math.floor(Math.random() * 100) + 50),
	// 	onSuccess: (newAccount: GameAccount) => {
	// 		queryClient.setQueryData(["gameAccount"], newAccount);
	// 	},
	// });

	return (
		<Card className={`p-6 ${colorClass}`}>
			<div className="flex items-center gap-4">
				<div className="flex-shrink-0">
					<Icon className="w-12 h-12" />
				</div>

				<div className="flex-grow">
					<div className="flex justify-between items-center mb-2">
						<h2 className="text-xl font-bold">{name}</h2>
						<span className="text-lg font-semibold">Lvl {level}</span>
					</div>

					<div className="space-y-2">
						<ExpBar current={exp} max={expForNextLevel} />
						<div className="flex justify-between text-sm opacity-75">
							<span>{exp} EXP</span>
							<span>{expForNextLevel} EXP</span>
						</div>
					</div>
				</div>
			</div>

			<button
				// onClick={() => gainExp()}
				// disabled={isLoading}
				className="mt-4 w-full bg-current text-white py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
			>
				{/* {isLoading ? "Training..." : "Train"} */}Soon..
			</button>
		</Card>
	);
};
