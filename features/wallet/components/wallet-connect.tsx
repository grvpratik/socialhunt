"use client";

import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet } from "lucide-react";
import axios from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

// Types
type WalletStatus =
	| "disconnected"
	| "connecting"
	| "connected"
	| "error"
	| "signing";
interface Props {
	onConnect?: (publicKey: string) => void;
	token: string;
	type: "user" | "payer";
}
const SIGN_IN_MESSAGE = "WELCOME TO SOCIAL HUNT";
export default function WalletConnect({ onConnect, token ,type}: Props) {
	const { publicKey, connect, disconnect, wallets, select, signMessage } =
		useWallet();
	const [status, setStatus] = useState<WalletStatus>("disconnected");
	const [error, setError] = useState<string>("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	useEffect(() => {
		if (publicKey) {
			setStatus("connected");
			onConnect?.(publicKey.toString());
			handleSignMessage();
		} else {
			setStatus("disconnected");
		}
	}, [publicKey]);

	const handleSignMessage = async () => {
		if (!publicKey || !signMessage) return;

		try {
			setStatus("signing");
			const message = new TextEncoder().encode(SIGN_IN_MESSAGE);
			const signature = await signMessage(message);

			if (!signature) {
				throw new Error("Message signing declined");
			}

			const response = await axios.post(
				`http://localhost:8080/v2/wallet/${type}/connect`,
				{
					signature,
					publicKey: publicKey.toString(),
				},
				{
					headers: {
						Authorization: token,
					},
				}
			);

			if (response.status === 200) {
				console.log("Successfully added wallet");
			}
		} catch (err) {
			setStatus("error");
			setError(
				err instanceof Error
					? err.message
					: "Failed to sign message or connect wallet"
			);
		}
	};

	const handleConnect = async (walletName: string) => {
		try {
			setStatus("connecting");
			setError("");
			const wallet = wallets.find(
				(w: { adapter: { name: string } }) => w.adapter.name === walletName
			);
			if (wallet) {
				select(wallet.adapter.name);
				await connect();
			}
		} catch (err) {
			setStatus("error");
			setError(err instanceof Error ? err.message : "Failed to connect wallet");
		}
	};

	const handleDisconnect = async () => {
		try {
			await disconnect();
			setStatus("disconnected");
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to disconnect wallet"
			);
		}
	};

	const renderWalletOptions = () => (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
			{wallets.map((wallet) => (
				<Button
					key={wallet.adapter.name}
					onClick={() => handleConnect(wallet.adapter.name)}
					className="flex items-center justify-center gap-2 h-16"
					variant="outline"
				>
					<img
						src={wallet.adapter.icon}
						alt={`${wallet.adapter.name} icon`}
						className="w-6 h-6"
					/>
					<span>{wallet.adapter.name}</span>
				</Button>
			))}
		</div>
	);

	const renderConnectedState = () => (
		<div className="flex flex-col items-center gap-4">
			<div className="flex items-center gap-2 text-green-600">
				<Wallet className="w-6 h-6" />
				<span className="font-medium">Connected</span>
			</div>
			<p className="text-sm text-gray-500 break-all text-center">
				{publicKey?.toString()}
			</p>
			<Button onClick={handleDisconnect} variant="destructive">
				Disconnect
			</Button>
		</div>
	);

	return (
		<div className="w-full max-w-md mx-auto flex justify-center items-center">
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogTrigger asChild>
					<Button
						className="w-full"
						variant={publicKey ? "outline" : "default"}
					>
						<Wallet className="w-5 h-5 mr-2" />
						{publicKey ? "Wallet Connected" : "Connect Wallet"}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>
							{publicKey ? "Wallet Connected" : "Connect Your Wallet"}
						</DialogTitle>
						<DialogDescription>
							{publicKey
								? "Your wallet is connected. You can disconnect or view details below."
								: "Choose your preferred wallet to connect to this app."}
						</DialogDescription>
					</DialogHeader>

					<div className="py-6">
						{status === "error" && (
							<Alert variant="destructive" className="mb-4">
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						{status === "signing" && (
							<Alert className="mb-4">
								<AlertDescription>
									Please sign the message in your wallet...
								</AlertDescription>
							</Alert>
						)}

						{publicKey ? renderConnectedState() : renderWalletOptions()}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
