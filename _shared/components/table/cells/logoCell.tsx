import Link from "next/link";

import { Avatar } from "_shared/components/avatar";

export type LogoCellProps = {
	label: string;
	imgUrl: string;
	href: string;
};

export function LogoCell({ label, imgUrl, href }: LogoCellProps) {
	return (
		<div className="flex gap-5 items-center">
			<Link href={href}>
				<div className="border rounded-xl overflow-hidden">
					<Avatar className="rounded-none" size="md" imgUrl={imgUrl} />
				</div>
			</Link>

			<Link className="text-base hidden md:block" href={href}>
				{label}
			</Link>
		</div>
	);
}
