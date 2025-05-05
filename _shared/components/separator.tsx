"use client";

import clsx from "clsx";
import { cva, VariantProps } from "class-variance-authority";

const separatorVariants = cva(
	["shrink-0 w-full bg-border-color h-[1px] my-1"],
	{
		variants: {},
		defaultVariants: {},
	},
);

type SeparatorProps = VariantProps<typeof separatorVariants> & {};

export const Separator = ({}: SeparatorProps) => {
	return <div className={clsx(separatorVariants())}></div>;
};
