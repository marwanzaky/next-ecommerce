"use client";

import { cva, VariantProps } from "class-variance-authority";

const avatarVariants = cva(["rounded-full", "overflow-hidden"], {
	variants: {
		variant: {},
		size: {
			md: "text-base h-10 w-10",
			lg: "text-2xl h-16 w-16",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

type AvatarProps = VariantProps<typeof avatarVariants> & {
	imgUrl?: string | null | undefined;
	fallbackImgUrl?: string | null | undefined;
	initials?: string;
	onClick?: React.MouseEventHandler<HTMLImageElement>;
};

export const Avatar = (props: AvatarProps) => {
	const imgUrl = props.imgUrl || props.fallbackImgUrl;

	return (
		<div
			className={`${avatarVariants(props)} ${props.onClick ? "cursor-pointer" : ""}`}
		>
			{imgUrl && (
				<img
					src={imgUrl}
					className="aspect-square w-full h-full"
					onClick={props.onClick}
				></img>
			)}

			{props.initials && (
				<div
					className="flex justify-center items-center bg-slate-100 w-full h-full uppercase"
					onClick={props.onClick}
				>
					{props.initials}
				</div>
			)}
		</div>
	);
};
