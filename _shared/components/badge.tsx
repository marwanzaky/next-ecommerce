import clsx from "clsx";

import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva([
	"inline-flex items-center",
	"rounded-md text-base",
	"px-2.5 h-[30px]",
	"bg-gray-200",
]);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, ...props }: BadgeProps) {
	return <div className={clsx(badgeVariants({}), className)} {...props} />;
}

export { Badge, badgeVariants };
