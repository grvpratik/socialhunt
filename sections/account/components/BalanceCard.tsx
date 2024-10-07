import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/features/api/utils";




export const BalanceCard = () => {
	const { data, error, isLoading, isError, isFetching } = useQuery({
		queryKey: ["Account"],
		queryFn: () => ApiService.getUser(),
	});

	if (isLoading) {
		return (
			<Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
				<CardContent className="pt-6">
					<div className="text-center">
						<Loader2 className="h-6 w-6 animate-spin mx-auto" />
						<p className="mt-2">Loading balance...</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	if (isError) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					Failed to load balance. {error.message}
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<>
			<Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
				<CardContent className="pt-6">
					<div className="text-center">
						<p className="text-sm opacity-90">Available Balance</p>
						<h1 className="text-4xl font-bold mt-2">{data.points} Points</h1>
					</div>
				</CardContent>
			</Card>
		</>
	);
};
