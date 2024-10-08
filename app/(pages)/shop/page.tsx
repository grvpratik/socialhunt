'use client'
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { ApiService } from "@/features/api/utils";
import { CharacterCard } from "@/sections/store/components/CharacterCard";


const TelegramShop: React.FC = () => {
	const {
		data: gameAccount,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["gameAccount"],
		queryFn:async()=>await ApiService.getGameAccountInfo(),
	});
console.log({gameAccount})
	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
			</div>
		);
	}

	if (error) {
		return (
			<Alert variant="destructive">
				<AlertDescription>
					Failed to load game account. Please try again later.
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className="flex flex-col gap-4 max-w-md mx-auto p-4">
			<CharacterCard
				type="knight"
				name="Knight"
				level={gameAccount.data.knight_lvl}
				exp={gameAccount.data.knight_exp}
			/>
			<CharacterCard
				type="mage"
				name="Mage"
				level={gameAccount.data.mage_lvl}
				exp={gameAccount.data.mage_exp}
			/>
			<CharacterCard
				type="beast"
				name="Beast"
				level={gameAccount.data.beast_lvl}
				exp={gameAccount.data.beast_exp}
			/>
		</div>
	);
};

export default TelegramShop;
