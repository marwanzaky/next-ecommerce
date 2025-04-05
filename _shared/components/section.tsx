export type SectionProps = {
	children?: React.ReactNode;
};

export function Section({ children }: SectionProps) {
	return (
		<section className="max-w-[1075px] mx-auto px-[10px]">{children}</section>
	);
}
