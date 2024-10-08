"use client";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { BalanceCard } from "@/sections/account/components/BalanceCard";
import { TransactionsList } from "@/sections/account/components/TransationList";
import UserWalletConnect from "@/sections/account/components/WalletConnect";

// const fetchTransactions = async () => {
// 	await new Promise((resolve) => setTimeout(resolve, 1000));
// 	if (Math.random() > 0.8) throw new Error("Failed to fetch transactions");
// 	return [
// 		{ date: "2024-03-15", description: "Coffee Purchase", points: -50 },
// 		{ date: "2024-03-14", description: "Reward Bonus", points: 100 },
// 		{ date: "2024-03-13", description: "Movie Ticket", points: -75 },
// 	];
// };

const TelegramAccount = () => {
	return (
		<div className="max-w-md mx-auto p-4 space-y-4">
			<BalanceCard />

			<Tabs defaultValue="account" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="account">Account</TabsTrigger>
					<TabsTrigger value="transactions">Transactions</TabsTrigger>
				</TabsList>

				<TabsContent value="account" className="space-y-4">
					<UserWalletConnect />
				</TabsContent>

				<TabsContent value="transactions">
					<Card>
						<CardHeader>
							<CardTitle>Recent Transactions</CardTitle>
						</CardHeader>
						<CardContent>
							<TransactionsList />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default TelegramAccount;
