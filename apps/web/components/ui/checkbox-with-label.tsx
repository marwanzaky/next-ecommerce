"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxWithLabel({
	id,
	label,
	value,
	onChange,
}: {
	id: string;
	label: string;
	value?: string | number | readonly string[];
	onChange?: React.FormEventHandler<HTMLButtonElement>;
}) {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox id={id} value={value} onChange={onChange} />

			<label
				htmlFor={id}
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{label}
			</label>
		</div>
	);
}
