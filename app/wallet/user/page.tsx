import WalletConnect from "@/features/wallet/components/wallet-connect";
import { storage } from "@/lib/utils";
import React from "react";

const UserWalletPage = ({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | undefined };
}) => {
	const token = searchParams!.token;
	if (!token) {
		return <div>no token provided</div>;
	}
	return (
		<div>
			<WalletConnect token={token} type="user" />
		</div>
	);
};

export default UserWalletPage;
