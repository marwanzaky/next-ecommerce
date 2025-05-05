"use client";

import { ButtonGhostGrey } from "@ui/Button";
import { useState } from "react";
import Overlay from "./overlay";

type Option = {
	label: string;
	value: string;
};

type SelectProps = {
	options: Option[];
	placeholder?: string;
	value?: string;
	onChange?: (value: string) => void;
	className?: string;
	styleClass?: string;
};

export default function Select({
	options,
	placeholder = "Select...",
	value,
	onChange,
	className = "",
	styleClass,
}: SelectProps) {
	const [visible, setVisible] = useState(false);
	const [selected, setSelected] = useState<Option | null>(
		options.find((opt) => opt.value === value) || null,
	);

	const handleOptionClick = (option: Option) => {
		setSelected(option);
		onChange?.(option.value);
		setVisible(false);
	};

	return (
		<Overlay
			trigger={
				<ButtonGhostGrey className={styleClass}>
					{selected?.label || placeholder}
				</ButtonGhostGrey>
			}
			visible={visible}
			onVisibleChange={(value) => setVisible(value)}
		>
			<ul>
				{options.map((option) => (
					<li
						key={option.value}
						onClick={() => handleOptionClick(option)}
						className="px-4 py-2 hover:bg-border-color cursor-pointer whitespace-nowrap text-black"
					>
						{option.label}
					</li>
				))}
			</ul>
		</Overlay>
	);
}
