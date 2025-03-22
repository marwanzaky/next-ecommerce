import { ButtonIcon } from "@ui/Button";

type DialogProps = {
	isOpen: boolean;
	title: string;
	onClose?: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
	width?: string;
};

export default function Dialog({
	isOpen,
	title,
	onClose,
	children,
	width,
}: DialogProps) {
	if (!isOpen) return null;

	return (
		<div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-[25px] rounded-xl shadow-lg" style={{ width }}>
				<div className="flex justify-between">
					<h2>{title}</h2>

					<ButtonIcon icon="close" onClick={onClose} />
				</div>

				{children}
			</div>
		</div>
	);
}
