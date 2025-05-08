import Icon from "@ui/Icon";
import { cva } from "class-variance-authority";
import clsx from "clsx";

const textareaVariants = cva(
	[
		"flex w-full h-52 max-h-96 min-h-[62px] px-[25px] py-5 leading-6",
		"rounded-xl bg-bg-dark",
		"outline-none shadow-[0_0_0_1pt_#ecf0f1] focus:shadow-[0_0_0_2pt_cornflowerblue]",
	],
	{
		variants: {},
		defaultVariants: {},
	},
);

type TextareaProps = Omit<React.ComponentProps<"textarea">, "size"> & {
	styleClass?: string;
	icon?: string;
	message?: string;
};

export function Textarea({
	className,
	styleClass,
	icon,
	message,
	...inputProps
}: TextareaProps) {
	return (
		<div className={className}>
			<div className="relative">
				<textarea
					className={clsx(textareaVariants({}), styleClass)}
					{...inputProps}
				/>

				{icon && (
					<div className="absolute top-[calc(31px-12px)] right-[25px]">
						<Icon className="filter-placeholder" icon={icon} />
					</div>
				)}
			</div>

			{message && <span className="text-red-600 text-xs">{message}</span>}
		</div>
	);
}
