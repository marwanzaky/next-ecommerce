import clsx from "clsx";

type LabelProps = {
	className?: string | undefined;
	children: React.ReactNode;
	htmlFor?: string | undefined;
};

export default function Label({ className, children, htmlFor }: LabelProps) {
	return (
		<label
			htmlFor={htmlFor}
			className={clsx("text-base leading-none", className)}
		>
			{children}
		</label>
	);
}
