"use client";

import { ApiService } from "@/features/api/utils";
import ActiveRaids from "@/sections/home/components/ActiveRaids";
import DungeonList from "@/sections/home/components/DungeonList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";

// interface User {
// 	tokens: number;
// 	// Add other user properties as needed
// }

interface Dungeon {
	id: string;
	entryTokens: number;
	// Add other dungeon properties as needed
}

const TelegramHome: React.FC = () => {
	const queryClient = useQueryClient();

	const { data: dungeons, isLoading: isDungeonsLoading } = useQuery({
		queryKey: ["dungeonList"],
		queryFn: () => ApiService.getDungeonsList(),
	});

	const { data: userData } = useQuery({
		queryKey: ["useracc"],
		queryFn: () => ApiService.getGameAccountInfo(),
	});

	const { data: activeRaids } = useQuery({
		queryKey: ["activeRaids"],
		queryFn: () => ApiService.getActiveRaids(),
	});

	const user = userData?.data;

	const enterDungeonMutation = useMutation({
		mutationFn: (dungeonId: string) => toast.promise(ApiService.startDungeonRaid(dungeonId), {
				loading: "Creating Raid..",
				success: <b>success</b>,
				error: <b>failed</b>,
			}),
		onSuccess: (data) => {
			if (data?.status === 201) {
				toast.success("Dungeon raid started successfully");
				// // Invalidate relevant queries
				// queryClient.invalidateQueries({ queryKey: ["activeRaids"] });
				// queryClient.invalidateQueries({ queryKey: ["useracc"] });
			}
		},
		onError: (error) => {
			toast.error(
				`Failed to start dungeon raid: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		},
	});

	const claimRewardMutation = useMutation({
		mutationFn: (raidId: string) =>
			toast.promise(ApiService.claimDungeonRaid(raidId), {
				loading: "Finding result might get lucky",
				success: <b>raild completed</b>,
				error: <b>failed</b>,
			}),
		onSuccess: (data) => {
			if (data?.status === 201) {
				toast.success("Reward claimed successfully");
				// Invalidate relevant queries
				queryClient.invalidateQueries({ queryKey: ["activeRaids"] });
				queryClient.invalidateQueries({ queryKey: ["useracc"] });
			}
		},
		onError: (error) => {
			toast.error(
				`Failed to claim reward: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		},
	});

	const handleEnterDungeon = (dungeonId: string) => {
		if (!user) {
			toast.error("User data not available");
			return;
		}

		const dungeon = dungeons?.data.find((d: Dungeon) => d.id === dungeonId);
		if (!dungeon) {
			toast.error("Dungeon not found");
			return;
		}

		if (user.tokens < dungeon.entryTokens) {
			toast("Insufficient tokens to enter this dungeon");
			return;
		}
		
		enterDungeonMutation.mutate(dungeonId);
	};

	const handleClaimReward = (raidId: string) => {
		claimRewardMutation.mutate(raidId);
	};
	console.log({ activeRaids });
	console.log({ dungeons });
	console.log({ user });
	return (
		<div className="container mx-auto px-4 py-8">
			<ActiveRaids
				raids={activeRaids?.data}
				onClaim={handleClaimReward}
				// isClaimingReward={claimRewardMutation.isPending}
			/>
			<DungeonList
				loading={isDungeonsLoading}
				dungeons={dungeons?.data}
				onEnter={handleEnterDungeon}
				// isEnteringDungeon={enterDungeonMutation.isPending}
			/>
		</div>
	);
};

export default TelegramHome;

// "use client";
// import React from "react";
// import { useQueries, useQueryClient } from "@tanstack/react-query";
// import { Loader2, ChevronRight, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
// 	Collapsible,
// 	CollapsibleContent,
// 	CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { ApiService } from "@/features/api/utils";

// interface GameData {
// 	accountInfo: any;
// 	dungeonsList: any;
// 	activeRaids: any;
// }

// export default function GameDataDisplay() {
// 	const [isOpen, setIsOpen] = React.useState({
// 		account: true,
// 		dungeons: true,
// 		raids: true,
// 	});
// 	const queryClient = useQueryClient();

// 	const queries = useQueries({
// 		queries: [
// 			{
// 				queryKey: ["gameAccount"],
// 				queryFn: () => ApiService.getGameAccountInfo(),
// 			},
// 			{
// 				queryKey: ["dungeonsList"],
// 				queryFn: () => ApiService.getDungeonsList(),
// 			},
// 			{
// 				queryKey: ["activeRaids"],
// 				queryFn: () => ApiService.getActiveRaids(),
// 			},
// 		],
// 	});

// 	const [accountQuery, dungeonsQuery, raidsQuery] = queries;

// 	const handleStartRaid = async (dungeonId: string) => {
// 		try {
// 			await startDungeonRaid(dungeonId);
// 			// Invalidate relevant queries
// 			queryClient.invalidateQueries({ queryKey: ["activeRaids"] });
// 			queryClient.invalidateQueries({ queryKey: ["dungeonsList"] });
// 		} catch (error) {
// 			console.error("Failed to start raid:", error);
// 		}
// 	};

// 	const handleClaimRaid = async (raidId: string) => {
// 		try {
// 			await claimDungeonRaid(raidId);
// 			// Invalidate relevant queries
// 			queryClient.invalidateQueries({ queryKey: ["activeRaids"] });
// 			queryClient.invalidateQueries({ queryKey: ["gameAccount"] });
// 		} catch (error) {
// 			console.error("Failed to claim raid:", error);
// 		}
// 	};

// 	if (queries.some((query) => query.isLoading)) {
// 		return (
// 			<div className="flex justify-center items-center h-full">
// 				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
// 			</div>
// 		);
// 	}

// 	if (queries.some((query) => query.isError)) {
// 		return (
// 			<div className="text-red-500 p-4 h-full justify-center items-center flex">
// 				Error loading game data. Please try again later.
// 			</div>
// 		);
// 	}

// 	const JsonDisplay = ({ data, level = 0 }: { data: any; level?: number }) => {
// 		if (typeof data !== "object" || data === null) {
// 			return <span className="text-green-600">{JSON.stringify(data)}</span>;
// 		}

// 		return (
// 			<div style={{ marginLeft: level * 20 }}>
// 				{Object.entries(data).map(([key, value]) => (
// 					<div key={key} className="my-1">
// 						<span className="text-blue-600">{key}</span>:{" "}
// 						{typeof value === "object" && value !== null ? (
// 							<Collapsible>
// 								<CollapsibleTrigger className="hover:bg-gray-100 p-1 rounded">
// 									{isOpen[key as keyof typeof isOpen] ? (
// 										<ChevronDown className="inline w-4 h-4" />
// 									) : (
// 										<ChevronRight className="inline w-4 h-4" />
// 									)}
// 								</CollapsibleTrigger>
// 								<CollapsibleContent>
// 									<JsonDisplay data={value} level={level + 1} />
// 								</CollapsibleContent>
// 							</Collapsible>
// 						) : (
// 							<JsonDisplay data={value} level={level + 1} />
// 						)}
// 					</div>
// 				))}
// 			</div>
// 		);
// 	};

// 	return (
// 		<div className="space-y-4 p-4 font-mono text-sm">
// 			<Collapsible
// 				open={isOpen.account}
// 				onOpenChange={(open) =>
// 					setIsOpen((prev) => ({ ...prev, account: open }))
// 				}
// 			>
// 				<CollapsibleTrigger className="flex items-center w-full hover:bg-gray-100 p-2 rounded">
// 					{isOpen.account ? (
// 						<ChevronDown className="w-4 h-4 mr-2" />
// 					) : (
// 						<ChevronRight className="w-4 h-4 mr-2" />
// 					)}
// 					<h2 className="font-semibold">Game Account</h2>
// 				</CollapsibleTrigger>
// 				<CollapsibleContent>
// 					<JsonDisplay data={accountQuery.data} />
// 				</CollapsibleContent>
// 			</Collapsible>

// 			<Collapsible
// 				open={isOpen.dungeons}
// 				onOpenChange={(open) =>
// 					setIsOpen((prev) => ({ ...prev, dungeons: open }))
// 				}
// 			>
// 				<CollapsibleTrigger className="flex items-center w-full hover:bg-gray-100 p-2 rounded">
// 					{isOpen.dungeons ? (
// 						<ChevronDown className="w-4 h-4 mr-2" />
// 					) : (
// 						<ChevronRight className="w-4 h-4 mr-2" />
// 					)}
// 					<h2 className="font-semibold">Dungeons List</h2>
// 				</CollapsibleTrigger>
// 				<CollapsibleContent>
// 					<div className="space-y-2">
// 						{console.log({ dungeonsQuery })}
// 						<JsonDisplay data={dungeonsQuery.data} />
// 						{dungeonsQuery &&
// 							dungeonsQuery.data &&
// 							dungeonsQuery.data.data &&
// 							dungeonsQuery.data!.data!.data.map((dungeon: any) => (
// 								<Button
// 									key={dungeon.id}
// 									onClick={() => handleStartRaid(dungeon.id)}
// 									size="sm"
// 									variant="outline"
// 									className="ml-4"
// 								>
// 									Start Raid
// 								</Button>
// 							))}
// 						{}
// 					</div>
// 				</CollapsibleContent>
// 			</Collapsible>

// 			<Collapsible
// 				open={isOpen.raids}
// 				onOpenChange={(open) => setIsOpen((prev) => ({ ...prev, raids: open }))}
// 			>
// 				<CollapsibleTrigger className="flex items-center w-full hover:bg-gray-100 p-2 rounded">
// 					{isOpen.raids ? (
// 						<ChevronDown className="w-4 h-4 mr-2" />
// 					) : (
// 						<ChevronRight className="w-4 h-4 mr-2" />
// 					)}
// 					<h2 className="font-semibold">Active Raids</h2>
// 				</CollapsibleTrigger>
// 				<CollapsibleContent>
// 					<div className="space-y-2">
// 						<JsonDisplay data={raidsQuery.data} />
// 						{raidsQuery &&
// 							raidsQuery.data &&
// 							raidsQuery.data.data &&
// 							raidsQuery.data.data.data.map((raid: any) => (
// 								<Button
// 									key={raid.id}
// 									onClick={() => handleClaimRaid(raid.id)}
// 									size="sm"
// 									variant="outline"
// 									className="ml-4"
// 								>
// 									Claim Raid
// 								</Button>
// 							))}
// 					</div>
// 				</CollapsibleContent>
// 			</Collapsible>
// 		</div>
// 	);
// }
