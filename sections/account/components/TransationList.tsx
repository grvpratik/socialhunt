'use client'
import { Button } from "@/components/ui/button";
import { Wallet, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/features/api/utils";
import Link from "next/link";
export const TransactionsList = () => {
	const { data, error, isLoading, isError, isFetching } = useQuery({
		queryKey: ["Account"],
		queryFn: () => ApiService.getDungeonsList(),
	});

	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-8">
				<Loader2 className="h-6 w-6 animate-spin" />
				<span className="ml-2">Loading transactions...</span>
			</div>
		);
	}

	if (isError) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					Failed to load transactions. {error.message}
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className="space-y-2">
			{/* {data.map((transaction, index) => (
				<div
					key={index}
					className="flex justify-between items-center py-2 border-b"
				>
					<div>
						<p className="font-medium">{transaction.description}</p>
						<p className="text-sm text-gray-500">{transaction.date}</p>
					</div>
					<span
						className={
							transaction.points > 0 ? "text-green-600" : "text-red-600"
						}
					>
						{transaction.points > 0 ? "+" : ""}
						{transaction.points}
					</span>
				</div>
			))} */}
		</div>
	);
};
