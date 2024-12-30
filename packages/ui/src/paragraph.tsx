"use client";

type ParagraphProps = {
	className: string;
	children: React.ReactNode;
};

// text-sm text-muted-foreground
export const Paragraph = (props: ParagraphProps) => {
	return (
		<p className={props.className + " leading-7 text-sm text-slate-900"}>
			{props.children}
		</p>
	);
};
