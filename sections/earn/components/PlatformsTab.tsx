"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/features/api/utils";
import { useTelegram } from "@/features/telegram/provider/telegram-provider";
import { Loader } from "lucide-react";
import { Youtube, Twitter, MessageCircle, Hash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlatformCard from "./PlatformCard";
// Types
export type Platform = "twitter" | "telegram" | "youtube" | "discord";
type TaskStatus = "PENDING" | "COMPLETED" | "FAILED";

interface Task {
	id: string;
	platform: Platform;
	task_name: string;
	amount: number;
	signature: string;
	comment?: string;
	task_link: string;
	payer_id: string;
	status?: TaskStatus;
	endDate?: Date;
	createdAt: Date;
	updatedAt: Date;
}

interface PlatformConfig {
	id: Platform;
	label: string;
	icon?: any; // If you want to add icons later
}

// Platform configurations
const PLATFORMS: PlatformConfig[] = [
	{ id: "youtube", label: "YouTube", icon: Youtube },
	{ id: "twitter", label: "Twitter", icon: Twitter },
	{ id: "telegram", label: "Telegram", icon: MessageCircle },
	{ id: "discord", label: "Discord", icon: Hash },
];
// Actively used platforms - you can adjust this as needed

interface TaskListCardProps {
	task: Task;
	webApp: any;
}

const TaskListCard: React.FC<TaskListCardProps> = ({ task, webApp }) => {
	return (
		<div className="p-4 border rounded-lg mb-4">
			<h3 className="font-semibold">{task.task_name}</h3>
			<p>Amount: {task.amount}</p>
			<p>Status: {task.status}</p>
		</div>
	);
};
const SKELETON_ITEMS = 3;
const TaskSkeleton = () => (
	<div className="space-y-4">
		{[...Array(SKELETON_ITEMS)].map((_, i) => (
			<div key={i} className=" rounded-lg">
				<Skeleton className="h-4 w-3/4 mb-2" />
				<Skeleton className="h-4 w-1/2" />
			</div>
		))}
	</div>
);

export function SegmentedControl() {
	const { webApp } = useTelegram();
	const [activePlatform, setActivePlatform] = React.useState<Platform>(
		PLATFORMS[0].id
	);

	const { data, error, isLoading, isFetching } = useQuery<Task[]>({
		queryKey: ["tasks", activePlatform],
		queryFn: () => ApiService.getTasks(activePlatform),
		enabled: !!webApp?.initData,
	});

	const handleTabChange = (value: string) => {
		setActivePlatform(value as Platform);
	};

	if (error) {
		return (
			<div className="p-4 text-red-500">
				Error occurred:{" "}
				{error instanceof Error ? error.message : "Unknown error"}
			</div>
		);
	}

	return (
		<div className="bg-background relative h-full w-full px-4">
			<h1 className="font-bold text-3xl p-2">Earn</h1>
			<h3 className="font-semibold text-xl p-2"> Social</h3>
			<Tabs defaultValue={PLATFORMS[0].id} onValueChange={handleTabChange}>
				<TabsList className={`grid rounded-full  w-full  grid-cols-4`}>
					{" "}
					{PLATFORMS.map((platform) => (
						<TabsTrigger
							className=" min-w-24 rounded-full"
							key={platform.id}
							value={platform.id}
						>
							{platform.icon && <platform.icon className="w-4 h-4 mr-2" />}
							{platform.label}
						</TabsTrigger>
					))}
				</TabsList>

				{PLATFORMS.map((platform) => (
					<TabsContent
						className=" grid grid-cols-2 gap-2"
						key={platform.id}
						value={platform.id}
					>
						{(isLoading || isFetching) && <TaskSkeleton />}
						{data && data.length > 0 ? (
							data
								.filter((task) => task.platform === platform.id)
								.map((task) => (
									<PlatformCard platform={platform.id} task={task} />
								))
						) : (
							<div className="text-center py-4 text-gray-500">
								No tasks available for {platform.label}
							</div>
						)}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
