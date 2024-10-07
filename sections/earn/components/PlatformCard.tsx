import React from "react";
import {
	Twitter,
	Youtube,
	MessageCircle,
	Hash,
	LucideIcon,
	Loader,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { ApiService } from "@/features/api/utils";
import { Button } from "@/components/ui/button";
import VerticalSteps from "./PlatformSteps";

type PlatformType = "twitter" | "youtube" | "telegram" | "discord";

interface PlatformConfig {
	icon: LucideIcon;
	color: string;
	bgColor: string;
	buttonText: string;
	
}

type PlatformConfigMap = {
	[K in PlatformType]: PlatformConfig;
};

const platformConfig: PlatformConfigMap = {
	twitter: {
		icon: Twitter,
		color: "#1DA1F2",
		bgColor: "#E8F5FE",
		buttonText: "Follow",
		
	},
	youtube: {
		icon: Youtube,
		color: "#FF0000",
		bgColor: "#FEE8E8",
		buttonText: "Subscribe",
		
	},
	telegram: {
		icon: MessageCircle,
		color: "#0088cc",
		bgColor: "#E8F4FC",
		buttonText: "Join",
		
	},
	discord: {
		icon: Hash,
		color: "#5865F2",
		bgColor: "#E8E9FE",
		buttonText: "Connect",
	
	},
};

interface PlatformCardProps {
	platform: PlatformType;
	task: any;
}

export default function PlatformCard({ platform, task }: PlatformCardProps) {
	console.log({task})
	const submitTaskMutation = useMutation({
		mutationFn: () => ApiService.submitTask(task.id),
		onSuccess: (data) => {
			if (data?.status === 201) {
				// toast.success("Submission created");
			}
		},
		onError: (error) => {
			console.log("useMutatuion", { error });
			// toast.error("Error occurred: " + error.message);
		},
	});

	const handleProofClick = () => {
		submitTaskMutation.mutate();
	};

	const config = platformConfig[platform.toLowerCase() as PlatformType];
	if (!config) return null;

	const Icon = config.icon;

	return (
		<div
			className=" rounded-xl p-4 flex flex-col items-center justify-between"
			style={{ backgroundColor: config.bgColor }}
		>
			<div className="flex flex-col items-center gap-2">
				<div
					className="w-12 h-12 rounded-xl flex items-center justify-center"
					style={{ backgroundColor: `${config.color}20` }}
				>
					<Icon color={config.color} size={24} />
				</div>
				<span className=" text-base font-semibold my-1  text-gray-800">
					{task.task_name}
				</span>
			</div>
			<VerticalSteps
				buttonColor={config.color}
				task={task}
				handleSubmit={handleProofClick}
				loading={submitTaskMutation.isPending}
			/>
		</div>
	);
}
