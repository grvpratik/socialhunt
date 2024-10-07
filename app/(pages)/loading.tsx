'use client'
import React from "react";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
	const [progress, setProgress] = React.useState(13);

	React.useEffect(() => {
		const timer = setTimeout(() => setProgress(66), 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4">
			<div className="w-full max-w-md space-y-8">
				{/* Logo Placeholder */}
				<div className="flex justify-center">
					<div className="relative">
						<div className="absolute inset-0 blur-lg bg-primary/20 rounded-full animate-pulse" />
						<div className="relative bg-background rounded-full p-4 border shadow-xl">
							<Loader2 className="h-12 w-12 text-primary animate-spin" />
						</div>
					</div>
				</div>

				{/* Loading Text */}
				<div className="text-center space-y-4">
					<h1 className="text-2xl font-bold tracking-tight">
						Loading your experience...
					</h1>
					<p className="text-muted-foreground">
						Please wait while we prepare everything for you
					</p>
				</div>

				{/* Progress Bar */}
				<div className="space-y-2">
					<Progress value={progress} className="h-2" />
					<p className="text-sm text-muted-foreground text-center">
						{progress}% Complete
					</p>
				</div>

				{/* Skeleton Cards */}
				<div className="space-y-4">
					<Card>
						<CardContent className="p-4">
							<div className="space-y-3">
								<Skeleton className="h-4 w-[250px]" />
								<Skeleton className="h-4 w-[200px]" />
							</div>
						</CardContent>
					</Card>
					<div className="grid grid-cols-2 gap-4">
						<Card>
							<CardContent className="p-4">
								<Skeleton className="h-4 w-[100px]" />
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-4">
								<Skeleton className="h-4 w-[100px]" />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
				<div className="h-1 w-1 rounded-full bg-muted-foreground animate-pulse" />
				Preparing your dashboard
			</div>
		</div>
	);
};

export default LoadingPage;
