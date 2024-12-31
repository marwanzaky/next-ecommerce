"use client";

type MutedProps = {
	className?: string;
	children: React.ReactNode;
};

// text-sm text-muted-foreground
export const Muted = (props: MutedProps) => {
	return (
		<p className={props.className + " text-sm text-gray-500"}>
			{props.children}
		</p>
	);
};
