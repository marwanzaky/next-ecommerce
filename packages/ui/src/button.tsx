"use client";

import { ReactNode } from "react";

interface ButtonProps {
	children: ReactNode;
	type?: "submit" | "reset" | "button";
	onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
	return (
		<button
			className="bg-slate-500 text-white"
			onClick={props.onClick}
			type={props.type}
		>
			{props.children}
		</button>
	);
};
