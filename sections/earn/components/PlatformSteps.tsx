"use client";

import React from "react";
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerClose,
	DrawerFooter,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, X, ArrowDown, Check, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnyARecord } from "dns";

interface Step {
	title: string;
	description: string;
	image?: string;
	link?: {
		url: string;
		text: string;
	};
}

const steps: Step[] = [
	{
		title: "Complete task",
		description:
			"Open the provided link and follow instructions to complete the task.",
		image: "/api/placeholder/600/400",
		link: {
			url: "https://example.com/task1",
			text: "Open Task",
		},
	},
	{
		title: "Make proof",
		description: "Take a screenshot of your completed task as evidence.",
		image: "/api/placeholder/600/400",
		link: {
			url: "https://example.com/how-to-screenshot",
			text: "How to take a screenshot",
		},
	},
	{
		title: "Create submission",
		description: "Prepare your submission with the proof you've gathered.",
	},
	{
		title: "Upload proof",
		description: "Upload your proof to verify task completion.",
		link: {
			url: "https://example.com/upload",
			text: "Go to upload page",
		},
	},
	{
		title: "Verify",
		description: "Wait for verification of your submission to receive points.",
	},
];

interface VerticalStepProps {
	step: number;
	title: string;
	description: string;
	image?: string;
	link?: {
		url: string;
		text: string;
	};
	isLast: boolean;
}

const VerticalStep = ({
	step,
	title,
	description,
	image,
	link,
	isLast,
}: VerticalStepProps) => (
	<div className="flex group">
		<div className="mr-4 flex flex-col items-center">
			<div className="relative">
				<div
					className={cn(
						"flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300",
						"border-primary bg-background",
						isLast && "bg-primary"
					)}
				>
					{isLast ? (
						<Check className="h-5 w-5 text-primary-foreground" />
					) : (
						<span className="text-primary font-semibold">{step}</span>
					)}
				</div>
			</div>
			{!isLast && (
				<div className="h-full w-px bg-border group-hover:bg-primary transition-colors duration-300" />
			)}
		</div>
		<div className="pt-1 pb-8 flex-1">
			<div className="space-y-2">
				<h3 className="text-lg font-semibold text-foreground leading-none">
					{title}
				</h3>
				{image && (
					<img
						src={image}
						alt={title}
						className="mt-2 rounded-md border border-border w-full object-cover h-40"
					/>
				)}
				<p className="text-muted-foreground text-sm">{description}</p>
				{link && (
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors"
					>
						<LinkIcon className="h-4 w-4" />
						<span>{link.text}</span>
					</a>
				)}
			</div>
		</div>
	</div>
);

interface VerticalStepsProps {
	handleSubmit?: () => void;
	buttonColor: string;
	task: any;
	loading:boolean
}

const VerticalSteps = ({ handleSubmit,buttonColor,task,loading }: VerticalStepsProps) => {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					className="w-full py-2 rounded-lg text-white font-medium text-sm transition-transform hover:scale-105"
					style={{ backgroundColor: buttonColor }}
				>
					Start
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-2xl">
					<ScrollArea className="h-[70vh] p-4">
						<div className="max-w-xl mx-auto">
							{steps.map((step, index) => (
								<VerticalStep
									key={index}
									step={index + 1}
									title={step.title}
									description={step.description}
									image={step.image}
									link={step.link}
									isLast={index === steps.length - 1}
								/>
							))}
						</div>
					</ScrollArea>
				</div>
			</DrawerContent>
			<DrawerFooter>
				<Button onClick={handleSubmit} className="cursor-pointer">
				{loading ? (
					<Loader className="animate-spin h-4 w-4" />
				) : (
					"Proof"
				)}
			</Button>
			</DrawerFooter>
		</Drawer>
	);
};

export default VerticalSteps;
