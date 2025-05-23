import Icon from "@ui/Icon";

export type ChipProps = {
	children?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLImageElement>;
};

export function Chip({ children, onClick }: ChipProps) {
	return (
		<div className="bg-gray-200 py-2 px-4 rounded-full flex flex-shrink-0 items-center gap-2 whitespace-nowrap">
			{children}
			<Icon
				className="cursor-pointer hover:filter-primary-dark"
				icon="close"
				onClick={onClick}
			/>
		</div>
	);
}
