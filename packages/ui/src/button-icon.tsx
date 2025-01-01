"use client";

import { cva, VariantProps } from "class-variance-authority";
import { ChevronRight, LucideProps, Trash2 } from "lucide-react";
import { ReactNode } from "react";

// inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9
const buttonIconVariants = cva(
	[
		"h-9 w-9 flex justify-center items-center",
		"rounded-md border border-gray-200",
		"disabled:pointer-events-none disabled:opacity-50",
		"text-sm font-medium",
		"bg-white hover:bg-gray-100 shadow-sm",
	],
	{
		variants: {},
		defaultVariants: {},
	},
);

type ButtonIconProps = VariantProps<typeof buttonIconVariants> & {
	children: JSX.Element;
	type?: "submit" | "reset" | "button";
	disabled?: boolean;
	onClick?: () => void;
};

export const ButtonIcon = (props: ButtonIconProps) => {
	return (
		<button
			className={buttonIconVariants(props)}
			onClick={props.onClick}
			type={props.type || "button"}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};
