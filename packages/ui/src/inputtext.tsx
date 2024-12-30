"use client";

import { cva, VariantProps } from "class-variance-authority";

// flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
const inputTextVariants = cva(
	[
		"px-3 h-9",
		"focus:ring-1 ring-gray-400 shadow-sm outline-none",
		"border rounded-md border-gray-200",
		"text-sm placeholder:text-gray-500",
	],
	{
		variants: {},
		defaultVariants: {},
	},
);

// text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70
const labelVariants = cva(["text-sm font-medium leading-none"], {
	variants: {},
	defaultVariants: {},
});

type InputTextProps = VariantProps<typeof inputTextVariants> & {
	id: string;
	label: string;
	placeholder?: string;
	type?: "text" | "email" | "password";
	value?: string;
	required: boolean;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const InputText = (props: InputTextProps) => {
	return (
		<div className="flex flex-col gap-2">
			<label className={labelVariants()} htmlFor={props.id}>
				{props.label}
			</label>

			<input
				className={inputTextVariants(props)}
				id={props.id}
				type={props.type}
				placeholder={props.placeholder}
				value={props.value}
				required={props.required}
				onChange={props.onChange}
			/>
		</div>
	);
};
