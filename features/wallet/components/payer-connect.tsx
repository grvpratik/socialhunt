"use client";
import React, { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, DollarSign } from "lucide-react";
import WalletConnect from "@/features/wallet/components/wallet-connect";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Payment configuration
const PAYMENT_CONFIG = {
	amount: 0.1, // SOL
	recipientAddress: "j1oAbxxiDUWvoHxEDhWE7THLjEkDQW2cSHYn2vttxTF",
};

type PaymentStatus = "initial" | "processing" | "success" | "error";

interface Props {
	token: string;
}

export default function PayerConnect({ token }: Props) {
	const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("initial");
	const [error, setError] = useState<string>("");

	const { publicKey, sendTransaction } = useWallet();
	const { connection } = useConnection();
	const router = useRouter();

	const handleConnect = async (publicKey: string) => {
		console.log("Wallet connected:", publicKey);
		// You can add any additional connection logic here
	};

	const handlePayment = async () => {
		if (!publicKey) {
			setError("Wallet is not connected.");
			return;
		}

		setPaymentStatus("processing");
		setError("");

		try {
			const transaction = new Transaction().add(
				SystemProgram.transfer({
					fromPubkey: publicKey,
					toPubkey: new PublicKey(PAYMENT_CONFIG.recipientAddress),
					lamports: PAYMENT_CONFIG.amount * 1000000000, // Convert SOL to lamports
				})
			);

			const {
				context: { slot: minContextSlot },
				value: { blockhash, lastValidBlockHeight },
			} = await connection.getLatestBlockhashAndContext();

			const signature = await sendTransaction(transaction, connection, {
				minContextSlot,
			});

			const confirmation = await connection.confirmTransaction({
				blockhash,
				lastValidBlockHeight,
				signature,
			});

			if (confirmation.value.err) {
				throw new Error("Transaction failed to confirm");
			}

			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API}/v1/payer/task`,
				{
					signature,
				},
				{
					headers: {
						Authorization: token,
					},
				}
			);

			setPaymentStatus("success");

			// Delay redirect slightly to show success state
			setTimeout(() => {
				setIsPaymentDialogOpen(false);
				router.push(`/task/${response.data.id}`);
			}, 2000);
		} catch (err) {
			console.error("Payment error:", err);
			setError(
				err instanceof Error ? err.message : "An error occurred during payment"
			);
			setPaymentStatus("error");
		}
	};

	const renderPaymentDialog = () => (
		<Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{paymentStatus === "processing"
							? "Processing Payment"
							: "Confirm Payment"}
					</DialogTitle>
					<DialogDescription>
						{paymentStatus === "processing"
							? "Please wait while we process your transaction..."
							: `You're about to send ${PAYMENT_CONFIG.amount} SOL`}
					</DialogDescription>
				</DialogHeader>

				{paymentStatus === "initial" && (
					<div className="py-4">
						<Card>
							<CardHeader>
								<CardTitle>Payment Details</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Amount:</span>
									<span className="font-medium">
										{PAYMENT_CONFIG.amount} SOL
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">From:</span>
									<span className="font-medium truncate ml-2 max-w-[200px]">
										{publicKey?.toString()}
									</span>
								</div>
							</CardContent>
						</Card>

						<Button onClick={handlePayment} className="w-full mt-4">
							Confirm Payment
						</Button>
					</div>
				)}

				{paymentStatus === "processing" && (
					<div className="flex flex-col items-center py-8">
						<Loader2 className="h-8 w-8 animate-spin mb-4" />
					</div>
				)}

				{paymentStatus === "success" && (
					<div className="flex flex-col items-center py-8">
						<DollarSign className="h-8 w-8 text-green-500 mb-4" />
						<DialogTitle>Payment Successful!</DialogTitle>
						<DialogDescription>
							Redirecting you to your task...
						</DialogDescription>
					</div>
				)}

				{paymentStatus === "error" && (
					<Alert variant="destructive" className="mt-4">
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}
			</DialogContent>
		</Dialog>
	);

	return (
		<div className="space-y-4 max-w-md mx-auto flex flex-col h-screen justify-center items-center">
			<WalletConnect onConnect={handleConnect} token={token} />

			{publicKey && (
				<Button
					onClick={() => {
						setPaymentStatus("initial");
						setIsPaymentDialogOpen(true);
					}}
					className="w-full"
					disabled={!publicKey}
				>
					<DollarSign className="w-5 h-5 mr-2" />
					Pay {PAYMENT_CONFIG.amount} SOL
				</Button>
			)}

			{renderPaymentDialog()}
		</div>
	);
}
