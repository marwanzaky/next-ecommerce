"use client";

import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

// inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2
const buttonVariants = cva(
	[
		"px-4 py-2",
		"rounded-md",
		"disabled:pointer-events-none disabled:opacity-50",
		"text-sm font-medium",
	],
	{
		variants: {
			variant: {
				primary: "bg-slate-900 text-white hover:bg-slate-800 shadow",
				secondary: "bg-gray-100 text-gray-900 hover:bg-gray-50",
				// inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2
				outline:
					"text-gray-900 hover:bg-gray-100 shadow-sm border border-gray-200",
				// inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2
				destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
				// inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2
				ghost: "text-slate-900 hover:bg-gray-100",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
	children: ReactNode;
	type?: "submit" | "reset" | "button";
	disabled?: boolean;
	onClick?: () => void;
};

export const Button = (props: ButtonProps) => {
	return (
		<button
			className={buttonVariants(props)}
			onClick={props.onClick}
			type={props.type || "button"}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};
