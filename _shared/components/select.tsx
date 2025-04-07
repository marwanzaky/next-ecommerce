"use client";

import { ButtonGhostGrey } from "@ui/Button";
import { useState, useRef, useEffect } from "react";
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
};

export default function Select({
	options,
	placeholder = "Select...",
	value,
	onChange,
	className = "",
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<Option | null>(
		options.find((opt) => opt.value === value) || null,
	);
	const ref = useRef<HTMLDivElement>(null);

	const toggleOpen = () => setIsOpen((prev) => !prev);
	const close = () => setIsOpen(false);

	const handleOptionClick = (option: Option) => {
		setSelected(option);
		onChange?.(option.value);
		close();
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				close();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div ref={ref} className={`relative ${className}`}>
			<ButtonGhostGrey onClick={toggleOpen}>
				{selected?.label || placeholder}
			</ButtonGhostGrey>

			{isOpen && (
				<Overlay>
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
			)}
		</div>
	);
}
