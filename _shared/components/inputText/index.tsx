import Icon from "@ui/Icon";
import { cva } from "class-variance-authority";

const inputTextVariants = cva(
	[
		"rounded-xl bg-bg-dark",
		"outline-none shadow-[0_0_0_1pt_#ecf0f1] focus:shadow-[0_0_0_2pt_cornflowerblue]",
	],
	{
		variants: {
			size: {
				sm: "px-[25px] h-[48px]",
				md: "px-[25px] h-[62px]",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

type InputTextProps = {
	className?: string;
	styleClass?: string;
	id?: string;
	type?: React.HTMLInputTypeAttribute;
	placeholder?: string;
	value?: string | number;
	min?: number;
	max?: number;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	icon?: string;
	step?: string;
	size?: "sm" | "md";
};

export function InputText({
	className,
	styleClass,
	id,
	type,
	placeholder,
	value,
	min,
	max,
	onChange,
	icon,
	step,
	size = "md",
}: InputTextProps) {
	return (
		<div className={`relative w-28 flex-1 ${className || ""}`}>
			<input
				className={`w-full ${inputTextVariants({ size })} ${styleClass || ""}`}
				step={step}
				type={type}
				id={id}
				placeholder={placeholder}
				value={value}
				min={min}
				max={max}
				onChange={onChange}
				required
			/>

			{icon && (
				<div className="absolute top-[calc(50%-12px)] right-[25px]">
					<Icon className="filter-placeholder" icon={icon} />
				</div>
			)}
		</div>
	);
}
