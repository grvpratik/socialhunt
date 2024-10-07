import { Wallet } from "@/features/wallet/provider/wallet-provider";
import React from "react";

const WalletLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return <Wallet>{children}</Wallet>;
};

export default WalletLayout;
