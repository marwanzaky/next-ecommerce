"use client";

import clsx from "clsx";
import { cva, VariantProps } from "class-variance-authority";

const buttonGhostVariants = cva(["bg-white rounded-lg"], {
	variants: {
		variant: {
			primary: "hover:bg-primary-dark text-black hover:text-white",
			gray: "hover:bg-gray-100 text-black",
		},
		size: {
			sm: "text-sm py-1.5 px-2",
			md: "text-base py-[15px] px-[30px]",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "sm",
	},
});

type ButtonGhostProps = VariantProps<typeof buttonGhostVariants> & {
	className?: string;
	type?: "submit" | "reset" | "button";
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
};

export const ButtonGhost = ({
	className,
	type,
	onClick,
	children,
	variant,
	size,
}: ButtonGhostProps) => {
	return (
		<button
			className={clsx(buttonGhostVariants({ variant, size }), className)}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
