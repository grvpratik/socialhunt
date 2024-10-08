'use client'
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

const characterGradients = {
	knight: "bg-gradient-to-r from-red-500 to-pink-500",
	mage: "bg-gradient-to-r from-blue-500 to-indigo-500",
	beast: "bg-gradient-to-r from-green-500 to-teal-500",
};

const ExpBar: React.FC<{ current: number; max: number }> = ({
	current,
	max,
}) => {
	const percentage = Math.min((current / max) * 100, 100);

	return (
		<div className="w-full h-2 bg-gray-200 rounded-full mt-2">
			<div
				className="h-full bg-yellow-400 rounded-full"
				style={{ width: `${percentage}%` }}
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
	const gradientClass = characterGradients[type];
	const expForNextLevel = calculateExpToNextLevel(level);

	return (
		<Card className={`p-4 rounded-lg shadow-lg ${gradientClass} text-white`}>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center space-x-3">
					<Icon className="w-8 h-8" />
					<div>
						<h2 className="text-xl font-semibold">{name}</h2>
						<p className="text-sm">Lvl {level}</p>
					</div>
				</div>
				<p className="text-lg font-semibold">
					EXP: {exp} / {expForNextLevel}
				</p>
			</div>

			<ExpBar current={exp} max={expForNextLevel} />

			<div className="text-sm mt-4 text-gray-100">
				<p>Level Progress</p>
				<p>Soon...</p>
			</div>
		</Card>
	);
};
