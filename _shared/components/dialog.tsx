import { ButtonIcon } from "@ui/Button";

type DialogProps = {
	isOpen: boolean;
	onClose?: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
	title: string;
};

export default function Dialog({
	isOpen,
	onClose,
	children,
	title,
}: DialogProps) {
	if (!isOpen) return null;

	return (
		<div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-[25px] rounded-xl shadow-lg w-96">
				<div className="flex justify-between">
					<h2>{title}</h2>

					<ButtonIcon icon="close" onClick={onClose} />
				</div>

				{children}
			</div>
		</div>
	);
}
