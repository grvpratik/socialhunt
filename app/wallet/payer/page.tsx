import React, { Suspense } from "react";
import PayerConnect from "@/features/wallet/components/payer-connect";
import { verifyToken } from "@/features/wallet/utils";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

// Loading component
function LoadingState() {
	return (
		<Card className="w-full max-w-md mx-auto">
			<CardContent className="flex flex-col items-center justify-center py-10">
				<Loader2 className="h-8 w-8 animate-spin mb-4" />
				<p className="text-sm text-muted-foreground">
					Loading payment interface...
				</p>
			</CardContent>
		</Card>
	);
}

// Error component
function ErrorState({ message }: { message: string }) {
	return (
		<Card className="w-full max-w-md mx-auto border-destructive">
			<CardContent className="pt-6">
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{message}</AlertDescription>
				</Alert>
			</CardContent>
		</Card>
	);
}

// Main content component
function PayerContent({ token,amount }: { token: string,amount:number }) {
	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Complete Your Payment</CardTitle>
				<CardDescription>
					Connect your wallet and process the payment to continue
				</CardDescription>
			</CardHeader>
			<CardContent>
				<PayerConnect token={token} amount={amount} />
			</CardContent>
		</Card>
	);
}

export default async function PayerPage({
	
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | undefined };
}) {
	// Wrapper component for consistent layout
	const PageWrapper = ({ children }: { children: React.ReactNode }) => (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-md mx-auto space-y-4">{children}</div>
		</div>
	);

	// Handle no token case
	if (!searchParams?.token) {
		return (
			<PageWrapper>
				<ErrorState message="No payment token provided. Please ensure you have a valid payment link." />
			</PageWrapper>
		);
	}

	const token = searchParams.token;

	try {
		const payload = await verifyToken(token);
		console.log(payload);
		if (!payload) {
			return (
				<PageWrapper>
					<ErrorState message="Invalid or expired payment token. Please request a new payment link." />
				</PageWrapper>
			);
		}

		return (
			<PageWrapper>
				<Suspense fallback={<LoadingState />}>
					<PayerContent token={token} amount={payload?.amount} />
				</Suspense>
			</PageWrapper>
		);
	} catch (error) {
		return (
			<PageWrapper>
				<ErrorState message="An error occurred while verifying the payment token. Please try again later." />
			</PageWrapper>
		);
	}
}
