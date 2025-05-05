import { ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";

type OverlayProps = {
	className?: string;
	visible?: boolean;
	onVisibleChange?: (visible: boolean) => void;
	children: ReactNode;
	trigger: ReactNode;
};

export default function Overlay({
	className,
	visible: controlledVisible,
	onVisibleChange,
	children,
	trigger,
}: OverlayProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

	const isControlled = controlledVisible !== undefined;
	const visible = isControlled ? controlledVisible : uncontrolledOpen;

	const setVisible = (value: boolean) => {
		if (isControlled) {
			onVisibleChange?.(value);
		} else {
			setUncontrolledOpen(value);
		}
	};

	const toggleVisible = () => {
		setVisible(!visible);
	};

	const onClickOutside = (event: MouseEvent) => {
		if (
			containerRef.current &&
			!containerRef.current.contains(event.target as Node)
		) {
			setVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", onClickOutside);

		return () => {
			document.removeEventListener("mousedown", onClickOutside);
		};
	}, []);

	return (
		<div ref={containerRef}>
			<div onClick={toggleVisible} className="cursor-pointer">
				{trigger}
			</div>

			{visible && (
				<div className="relative">
					<div
						className={clsx(
							"absolute z-10 mt-1 w-full overflow-auto bg-white border border-border-color rounded-xl shadow-lg",
							className,
						)}
					>
						{children}
					</div>
				</div>
			)}
		</div>
	);
}
