"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { CopyIcon, ExternalLink } from "lucide-react";
import { getTokenMetadata } from "@/features/wallet/utils/getTokenInfo";
import { ApiService } from "@/features/api/utils";

interface TokenInfoProps {
	address: string;
}

const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
		// Optionally show a toast notification here
	} catch (err) {
		console.error("Failed to copy:", err);
	}
};

const truncateAddress = (address: string) => {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function TokenInfo({ address }: TokenInfoProps) {
	const {
		data: token,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["tokenMetadata", address],
		queryFn: () => ApiService.getTokenMetadata(address),
		enabled: !!address,
	});

	if (isLoading) {
		return (
			<div className="flex items-center space-x-4 animate-pulse">
				<div className="w-10 h-10 rounded-full bg-gray-200" />
				<div className="flex-1">
					<div className="h-4 bg-gray-200 rounded w-1/4" />
					<div className="h-3 bg-gray-200 rounded w-1/3 mt-2" />
				</div>
				<div className="text-right">
					<div className="h-3 bg-gray-200 rounded w-12" />
					<div className="h-4 bg-gray-200 rounded w-16 mt-1" />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-red-500">
				Failed to load token information:{" "}
				{error instanceof Error ? error.message : "Unknown error"}
			</div>
		);
	}

	if (!token) {
		return <div>No token information available</div>;
	}

	return (
		<div className="flex items-center justify-between p-4 rounded-lg border">
			<div className="flex items-center space-x-4">
				{token.tokenLogo && (
					<img
						src={token.tokenLogo}
						alt={token.tokenName || "Token"}
						className="w-8 h-8 rounded-full"
					/>
				)}
				<div>
					<h3 className="font-semibold text-sm line-clamp-1">
						{token.tokenName || "Unknown Token"}
					</h3>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="text-sm text-gray-500 flex items-center">
								{truncateAddress(address)}
								<button
									onClick={() => copyToClipboard(address)}
									className="ml-2 hover:text-gray-700"
								>
									<CopyIcon size={14} />
								</button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Click to copy address</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
			<div className="text-right">
				<p className="text-sm text-gray-500">{token.tokenSymbol}</p>
				<p className="font-semibold">${token.price.toFixed(2)}</p>
			</div>
		</div>
	);
}
