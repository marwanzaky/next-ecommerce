import clsx from "clsx";

export type SectionProps = {
	className?: string;
	children?: React.ReactNode;
};

export function Section({ className, children }: SectionProps) {
	return (
		<section className={clsx("max-w-[1075px] mx-auto px-[10px]", className)}>
			{children}
		</section>
	);
}
