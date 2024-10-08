import React from "react";
import DungeonCard from "./DungeonCard";

interface DungeonListProps {
	dungeons: any[];
	userLevel?: number;
	onEnter: (dungeonId: string) => void;
	loading: boolean;
}
const DungeonList: React.FC<DungeonListProps> = ({
	dungeons,
	userLevel,
	onEnter,
	loading,
}) => {
	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Available Dungeons</h2>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{dungeons &&
						dungeons.length > 0 &&
						dungeons.map((dungeon) => (
							<DungeonCard
								key={dungeon.id}
								dungeon={dungeon}
								userLevel={userLevel}
								onEnter={onEnter}
							/>
						))}
				</div>
			)}
		</div>
	);
};

export default DungeonList;
