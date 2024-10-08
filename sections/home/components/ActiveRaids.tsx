import ActiveRaidCard from "./ActiveRaidCard";

interface ActiveRaidProps {
	raids: any;
	onClaim: (raidId: string) => void;
}
const ActiveRaids = ({ raids, onClaim }: ActiveRaidProps) => {
	if (!raids || raids.length === 0) return null;

	return (
		<div className="mb-8">
			<h2 className="text-2xl font-bold mb-4">Active Raids</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{raids && raids.length>0 &&
					raids.map((raid: any) => (
						<ActiveRaidCard key={raid.id} raid={raid} onClaim={onClaim} />
					))}
			</div>
		</div>
	);
};
export default ActiveRaids;
