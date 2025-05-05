import { ButtonIcon } from "@ui/Button";
import clsx from "clsx";
import { createPortal } from "react-dom";

type DialogProps = {
	isOpen: boolean;
	title: string;
	onClose?: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
	width?: string;
	className?: string;
	positionClass?: string;
	overlay?: boolean;
};

export default function Dialog({
	isOpen,
	title,
	onClose,
	children,
	width,
	className,
	positionClass = "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
	overlay = true,
}: DialogProps) {
	if (!isOpen) return null;

	return createPortal(
		<div
			className={clsx(
				"z-50 fixed inset-0 flex",
				overlay ? "bg-black bg-opacity-50" : "pointer-events-none",
			)}
		>
			<div
				className={clsx(
					"absolute bg-white p-[25px] rounded-xl shadow-lg",
					positionClass,
				)}
				style={{ width }}
			>
				<div className="flex justify-between">
					<h2>{title}</h2>

					<ButtonIcon icon="close" onClick={onClose} />
				</div>

				<div className={className}>{children}</div>
			</div>
		</div>,
		document.body,
	);
}
