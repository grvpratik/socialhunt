'use client'
import React from "react";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { Loader2, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ApiService } from "@/features/api/utils";

interface GameData {
	accountInfo: any;
	dungeonsList: any;
	activeRaids: any;
}

export default function GameDataDisplay() {
	const [isOpen, setIsOpen] = React.useState({
		account: true,
		dungeons: true,
		raids: true,
	});
	const queryClient = useQueryClient();

	const queries = useQueries({
		queries: [
			{
				queryKey: ["gameAccount"],
				queryFn: () => ApiService.getGameAccountInfo(),
			},
			{
				queryKey: ["dungeonsList"],
				queryFn: () => ApiService.getDungeonsList(),
			},
			{
				queryKey: ["activeRaids"],
				queryFn: () => ApiService.getActiveRaids(),
			},
		],
	});

	const [accountQuery, dungeonsQuery, raidsQuery] = queries;

	const handleStartRaid = async (dungeonId: string) => {
		try {
			await startDungeonRaid(dungeonId);
			// Invalidate relevant queries
			queryClient.invalidateQueries({ queryKey: ["activeRaids"] });
			queryClient.invalidateQueries({ queryKey: ["dungeonsList"] });
		} catch (error) {
			console.error("Failed to start raid:", error);
		}
	};

	const handleClaimRaid = async (raidId: string) => {
		try {
			await claimDungeonRaid(raidId);
			// Invalidate relevant queries
			queryClient.invalidateQueries({ queryKey: ["activeRaids"] });
			queryClient.invalidateQueries({ queryKey: ["gameAccount"] });
		} catch (error) {
			console.error("Failed to claim raid:", error);
		}
	};

	if (queries.some((query) => query.isLoading)) {
		return (
			<div className="flex items-center justify-center h-64">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	if (queries.some((query) => query.isError)) {
		return (
			<div className="text-red-500 p-4">
				Error loading game data. Please try again later.
			</div>
		);
	}

	const JsonDisplay = ({ data, level = 0 }: { data: any; level?: number }) => {
		if (typeof data !== "object" || data === null) {
			return <span className="text-green-600">{JSON.stringify(data)}</span>;
		}

		return (
			<div style={{ marginLeft: level * 20 }}>
				{Object.entries(data).map(([key, value]) => (
					<div key={key} className="my-1">
						<span className="text-blue-600">{key}</span>:{" "}
						{typeof value === "object" && value !== null ? (
							<Collapsible>
								<CollapsibleTrigger className="hover:bg-gray-100 p-1 rounded">
									{isOpen[key as keyof typeof isOpen] ? (
										<ChevronDown className="inline w-4 h-4" />
									) : (
										<ChevronRight className="inline w-4 h-4" />
									)}
								</CollapsibleTrigger>
								<CollapsibleContent>
									<JsonDisplay data={value} level={level + 1} />
								</CollapsibleContent>
							</Collapsible>
						) : (
							<JsonDisplay data={value} level={level + 1} />
						)}
					</div>
				))}
			</div>
		);
	};

	return (
		<div className="space-y-4 p-4 font-mono text-sm">
			<Collapsible
				open={isOpen.account}
				onOpenChange={(open) =>
					setIsOpen((prev) => ({ ...prev, account: open }))
				}
			>
				<CollapsibleTrigger className="flex items-center w-full hover:bg-gray-100 p-2 rounded">
					{isOpen.account ? (
						<ChevronDown className="w-4 h-4 mr-2" />
					) : (
						<ChevronRight className="w-4 h-4 mr-2" />
					)}
					<h2 className="font-semibold">Game Account</h2>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<JsonDisplay data={accountQuery.data} />
				</CollapsibleContent>
			</Collapsible>

			<Collapsible
				open={isOpen.dungeons}
				onOpenChange={(open) =>
					setIsOpen((prev) => ({ ...prev, dungeons: open }))
				}
			>
				<CollapsibleTrigger className="flex items-center w-full hover:bg-gray-100 p-2 rounded">
					{isOpen.dungeons ? (
						<ChevronDown className="w-4 h-4 mr-2" />
					) : (
						<ChevronRight className="w-4 h-4 mr-2" />
					)}
					<h2 className="font-semibold">Dungeons List</h2>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div className="space-y-2">
						<JsonDisplay data={dungeonsQuery.data} />
						{dungeonsQuery.data?.dungeons?.map((dungeon: any) => (
							<Button
								key={dungeon.id}
								onClick={() => handleStartRaid(dungeon.id)}
								size="sm"
								variant="outline"
								className="ml-4"
							>
								Start Raid
							</Button>
						))}
					</div>
				</CollapsibleContent>
			</Collapsible>

			<Collapsible
				open={isOpen.raids}
				onOpenChange={(open) => setIsOpen((prev) => ({ ...prev, raids: open }))}
			>
				<CollapsibleTrigger className="flex items-center w-full hover:bg-gray-100 p-2 rounded">
					{isOpen.raids ? (
						<ChevronDown className="w-4 h-4 mr-2" />
					) : (
						<ChevronRight className="w-4 h-4 mr-2" />
					)}
					<h2 className="font-semibold">Active Raids</h2>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div className="space-y-2">
						<JsonDisplay data={raidsQuery.data} />
						{raidsQuery.data?.raids?.map((raid: any) => (
							<Button
								key={raid.id}
								onClick={() => handleClaimRaid(raid.id)}
								size="sm"
								variant="outline"
								className="ml-4"
							>
								Claim Raid
							</Button>
						))}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
