// import React from 'react';
// import { useQuery } from 'react-query';
// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

// // Real API endpoint
// const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// const fetchSolanaPrice = async () => {
//   try {
//     const response = await fetch(
//       `${COINGECKO_API_BASE}/simple/price?ids=solana&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_market_cap=true`
//     );
    
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
    
//     const data = await response.json();
    
//     if (!data.solana) {
//       throw new Error('No data found for Solana');
//     }

//     return {
//       currentPrice: data.solana.usd,
//       percentageChange: data.solana.usd_24h_change,
//       volume24h: data.solana.usd_24h_vol,
//       marketCap: data.solana.usd_market_cap
//     };
//   } catch (error) {
//     throw new Error('Failed to fetch Solana price data: ' + error.message);
//   }
// };

// // Utility function to format large numbers
// const formatLargeNumber = (num) => {
//   if (num >= 1e9) {
//     return (num / 1e9).toFixed(1) + 'B';
//   } else if (num >= 1e6) {
//     return (num / 1e6).toFixed(1) + 'M';
//   } else if (num >= 1e3) {
//     return (num / 1e3).toFixed(1) + 'K';
//   }
//   return num.toFixed(2);
// };

// const formatCurrency = (value) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   }).format(value);
// };

// const SolanaPriceCard = () => {
//   const { data, isLoading, isError, error } = useQuery(
//     'solanaPrice',
//     fetchSolanaPrice,
//     {
//       refetchInterval: 60000, // Refetch every minute
//       retry: 3,
//       retryDelay: 1000,
//       onError: (error) => {
//         console.error('Error fetching Solana price:', error);
//       }
//     }
//   );

//   if (isLoading) {
//     return (
//       <Card className="w-full max-w-md">
//         <CardContent className="pt-6">
//           <div className="flex items-center justify-between">
//             <div className="space-y-2">
//               <Skeleton className="h-4 w-20" />
//               <Skeleton className="h-8 w-32" />
//             </div>
//             <Skeleton className="h-12 w-12 rounded-full" />
//           </div>
//           <div className="mt-4 space-y-2">
//             <Skeleton className="h-4 w-full" />
//             <Skeleton className="h-4 w-3/4" />
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (isError) {
//     return (
//       <Alert variant="destructive">
//         <AlertCircle className="h-4 w-4" />
//         <AlertDescription>
//           {error?.message || 'Failed to load Solana price data'}
//         </AlertDescription>
//       </Alert>
//     );
//   }

//   const isPositiveChange = data.percentageChange > 0;

//   return (
//     <Card className="w-full max-w-md">
//       <CardContent className="pt-6">
//         <div className="flex items-start justify-between">
//           <div>
//             <div className="flex items-center space-x-2">
//               <img
//                 src="/api/placeholder/32/32"
//                 alt="Solana"
//                 className="w-8 h-8 rounded-full"
//               />
//               <span className="text-xl font-semibold">Solana</span>
//               <span className="text-sm text-muted-foreground">SOL</span>
//             </div>
//             <div className="mt-2 flex items-baseline space-x-2">
//               <span className="text-3xl font-bold">
//                 {formatCurrency(data.currentPrice)}
//               </span>
//               <div className={`flex items-center ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
//                 {isPositiveChange ? (
//                   <TrendingUp className="h-5 w-5" />
//                 ) : (
//                   <TrendingDown className="h-5 w-5" />
//                 )}
//                 <span className="ml-1 text-sm font-medium">
//                   {isPositiveChange ? '+' : ''}{data.percentageChange.toFixed(2)}%
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className={`p-3 rounded-full ${isPositiveChange ? 'bg-green-100' : 'bg-red-100'}`}>
//             {isPositiveChange ? (
//               <TrendingUp className={`h-6 w-6 ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`} />
//             ) : (
//               <TrendingDown className={`h-6 w-6 ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`} />
//             )}
//           </div>
//         </div>
        
//         <div className="mt-4 grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm text-muted-foreground">24h Volume</p>
//             <p className="text-sm font-medium">${formatLargeNumber(data.volume24h)}</p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground">Market Cap</p>
//             <p className="text-sm font-medium">${formatLargeNumber(data.marketCap)}</p>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default SolanaPriceCard;

// import React from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

// // Utility function to format large numbers
// const formatLargeNumber = (num) => {
// 	if (num >= 1e9) {
// 		return (num / 1e9).toFixed(1) + "B";
// 	} else if (num >= 1e6) {
// 		return (num / 1e6).toFixed(1) + "M";
// 	} else if (num >= 1e3) {
// 		return (num / 1e3).toFixed(1) + "K";
// 	}
// 	return num.toFixed(2);
// };

// const formatCurrency = (value) => {
// 	return new Intl.NumberFormat("en-US", {
// 		style: "currency",
// 		currency: "USD",
// 		minimumFractionDigits: 2,
// 		maximumFractionDigits: 2,
// 	}).format(value);
// };

// const sampleData = {
// 	currentPrice: 24.56,
// 	percentageChange: -1.23,
// 	volume24h: 956123000,
// 	marketCap: 8500000000,
// };

// const SolanaPriceCard = () => {
// 	const data = sampleData;
// 	const isPositiveChange = data.percentageChange > 0;

// 	return (
// 		<Card className="w-full max-w-md">
// 			<CardContent className="pt-6">
// 				<div className="flex items-start justify-between">
// 					<div>
// 						<div className="flex items-center space-x-2">
// 							<img
// 								src="/api/placeholder/32/32"
// 								alt="Solana"
// 								className="w-8 h-8 rounded-full"
// 							/>
// 							<span className="text-xl font-semibold">Solana</span>
// 							<span className="text-sm text-muted-foreground">SOL</span>
// 						</div>
// 						<div className="mt-2 flex items-baseline space-x-2">
// 							<span className="text-3xl font-bold">
// 								{formatCurrency(data.currentPrice)}
// 							</span>
// 							<div
// 								className={`flex items-center ${
// 									isPositiveChange ? "text-green-500" : "text-red-500"
// 								}`}
// 							>
// 								{isPositiveChange ? (
// 									<TrendingUp className="h-5 w-5" />
// 								) : (
// 									<TrendingDown className="h-5 w-5" />
// 								)}
// 								<span className="ml-1 text-sm font-medium">
// 									{isPositiveChange ? "+" : ""}
// 									{data.percentageChange.toFixed(2)}%
// 								</span>
// 							</div>
// 						</div>
// 					</div>
// 					<div
// 						className={`p-3 rounded-full ${
// 							isPositiveChange ? "bg-green-100" : "bg-red-100"
// 						}`}
// 					>
// 						{isPositiveChange ? (
// 							<TrendingUp
// 								className={`h-6 w-6 ${
// 									isPositiveChange ? "text-green-500" : "text-red-500"
// 								}`}
// 							/>
// 						) : (
// 							<TrendingDown
// 								className={`h-6 w-6 ${
// 									isPositiveChange ? "text-green-500" : "text-red-500"
// 								}`}
// 							/>
// 						)}
// 					</div>
// 				</div>

// 				<div className="mt-4 grid grid-cols-2 gap-4">
// 					<div>
// 						<p className="text-sm text-muted-foreground">24h Volume</p>
// 						<p className="text-sm font-medium">
// 							${formatLargeNumber(data.volume24h)}
// 						</p>
// 					</div>
// 					<div>
// 						<p className="text-sm text-muted-foreground">Market Cap</p>
// 						<p className="text-sm font-medium">
// 							${formatLargeNumber(data.marketCap)}
// 						</p>
// 					</div>
// 				</div>
// 			</CardContent>
// 		</Card>
// 	);
// };

// export default SolanaPriceCard;
