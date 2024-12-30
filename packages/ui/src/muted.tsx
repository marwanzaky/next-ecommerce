"use client";

type MutedProps = {
	children: React.ReactNode;
};

// text-sm text-muted-foreground
export const Muted = (props: MutedProps) => {
	return <p className="text-sm text-gray-500">{props.children}</p>;
};
