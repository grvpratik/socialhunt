
"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Wallet, ExternalLink, Unlink } from "lucide-react";
import { storage } from "@/lib/utils";
import Link from "next/link";
import { ApiService } from "@/features/api/utils";
import { useQuery } from "@tanstack/react-query";

interface WalletConnectProps {
	onDisconnect?: any;
}
const UserWalletConnect = ({ onDisconnect }: WalletConnectProps) => {
	const token = storage.getToken();
	console.log({ token });
	const [loading, setLoading] = useState(true);
	const { data, error, isLoading, isError } = useQuery({
		queryKey: ["Account"],
		queryFn: () => ApiService.getUser(),
	});

	useEffect(() => {
		if (token) {
			setLoading(false);
		}
	}, [token]);

	const handleDisconnect = async () => {
        try {
					// Make API call to remove address
					// const response = await fetch('/api/disconnect-wallet', {
					//   method: 'POST',
					//   headers: {
					//     'Authorization': `Bearer ${token}`,
					//   },
					// });

					// if (response.ok) {

					
					// }
					// setIsConnected(false);
					if (onDisconnect) {
						onDisconnect();
					}
				} catch (error) {
			console.error("Error disconnecting wallet:", error);
		}
	};

	const truncateAddress = (addr: string) => {
		return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
	};

	// Check if the user is connected based on the data fetched by useQuery
	const isConnected = !!data?.address;

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					{isConnected ? "Wallet Connected" : "Connect Wallet"}
				</CardTitle>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<p>Loading...</p>
				) : isError ? (
					<p>Error loading wallet data</p>
				) : isConnected ? (
					<div className="space-y-4">
						<div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
							<div className="flex items-center space-x-3">
								<Wallet className="h-5 w-5 text-green-600" />
								<span className="font-medium text-green-800">
									{truncateAddress(data?.address!)}
								</span>
							</div>
							<Button variant="ghost" size="sm" asChild>
								<Link
									href={`https://etherscan.io/address/${data?.address}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<ExternalLink className="h-4 w-4" />
								</Link>
							</Button>
						</div>

						<Dialog>
							<DialogTrigger asChild>
								<Button variant="destructive" className="w-full">
									<Unlink className="mr-2 h-4 w-4" />
									Disconnect Wallet
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Are you sure?</DialogTitle>
									<DialogDescription>
										This action will disconnect your wallet. You will need to
										reconnect to manage your points and make transactions.
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<DialogClose><Button variant={'outline'}>Cancel</Button></DialogClose>
									<Button variant="destructive" onClick={handleDisconnect}>
										Disconnect
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				) : (
					<>
						<Button className="w-full" variant="outline" disabled={loading}>
							<Wallet className="mr-2 h-4 w-4" />
							<Link href={`/wallet/user?token=${token}`} target="_blank">
								{loading ? "Loading..." : "Connect Wallet"}
							</Link>
						</Button>
						<p className="text-sm text-gray-500 mt-2">
							Connect your wallet to manage your points and make transactions.
						</p>
					</>
				)}
			</CardContent>
		</Card>
	);
};

export default UserWalletConnect;
