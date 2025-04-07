import { ReactNode } from "react";
import clsx from "clsx";

type OverlayProps = {
	children: ReactNode;
	className?: string;
};

export default function Overlay({ children, className }: OverlayProps) {
	return (
		<div
			className={clsx(
				"absolute z-10 mt-1 w-full overflow-auto bg-white border border-border-color rounded-xl shadow-lg",
				className,
			)}
		>
			{children}
		</div>
	);
}
