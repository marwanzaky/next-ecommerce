"use client";

import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";

const avatarVariants = cva(["rounded-full", "overflow-hidden"], {
	variants: {
		variant: {},
		size: {
			md: "text-base h-12 w-12",
			lg: "text-2xl h-16 w-16",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

type AvatarProps = VariantProps<typeof avatarVariants> & {
	className?: string;
	imgUrl?: string | null | undefined;
	fallbackImgUrl?: string | null | undefined;
	initials?: string;
	onClick?: React.MouseEventHandler<HTMLImageElement>;
};

export const Avatar = ({
	className,
	imgUrl,
	fallbackImgUrl,
	initials,
	size,
	onClick,
}: AvatarProps) => {
	const imgSrc = imgUrl || fallbackImgUrl || "/img/avatar.jpg";

	return (
		<div
			className={`${className} ${avatarVariants({ size })} ${
				onClick ? "cursor-pointer" : ""
			}`}
		>
			{imgUrl && (
				<Image
					className="aspect-square w-full h-full"
					src={imgSrc}
					width={512}
					height={512}
					alt=""
				></Image>
			)}

			{initials && (
				<div
					className="flex justify-center items-center bg-slate-100 w-full h-full uppercase"
					onClick={onClick}
				>
					{initials}
				</div>
			)}
		</div>
	);
};
