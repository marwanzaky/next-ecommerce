"use client";

import { ReactNode } from "react";

type ButtonProps = {
	children: ReactNode;
	type?: "submit" | "reset" | "button";
	onClick?: () => void;
};

export const Button = (props: ButtonProps) => {
	return (
		<button
			onClick={props.onClick}
			type={props.type}
			className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>
			{props.children}
		</button>
	);
};
