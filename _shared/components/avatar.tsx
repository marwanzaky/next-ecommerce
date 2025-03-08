type AvatarProps = {
	className?: string;
	imgUrl: string | undefined | null;
};

export default function Avatar({ className, imgUrl }: AvatarProps) {
	return (
		<img
			className={`${className} w-16 h-16 rounded-full`}
			src={imgUrl || "/img/avatar.jpg"}
		></img>
	);
}
