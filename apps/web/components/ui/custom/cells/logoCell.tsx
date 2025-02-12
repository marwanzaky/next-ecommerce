import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export type LogoCellProps = {
	label: string;
	imgUrl: string;
	href: string;
};

export function LogoCell({ label, imgUrl, href }: LogoCellProps) {
	const router = useRouter();

	const redirect: React.MouseEventHandler<HTMLImageElement> = () => {
		router.push(href);
	};

	return (
		<div className="flex gap-2 items-center">
			<Avatar className="h-8 w-8 rounded-lg">
				<AvatarImage src={imgUrl} />
			</Avatar>

			<div role="button" onClick={redirect}>
				{label}
			</div>
		</div>
	);
}
