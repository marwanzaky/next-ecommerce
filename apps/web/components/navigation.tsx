"use client";

import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../redux/store";

import React from "react";
import { Avatar } from "@repo/ui/avatar";
import { selectUserInitials } from "../redux/selectors/authSelectors";
import { ButtonIcon } from "@repo/ui/button-icon";
import { ShoppingCart } from "lucide-react";

function NavItem(props: {
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
	return (
		<a className="text-sm font-medium cursor-pointer" onClick={props.onClick}>
			{props.children}
		</a>
	);
}

export default function Navigation() {
	const router = useRouter();

	const { isAuthenticated, user } = useAppSelector(
		(state) => state.authReducer,
	);

	const userInitials = useAppSelector(selectUserInitials);

	return (
		<nav className="sticky top-0 z-10 bg-white flex justify-between items-center h-16 border-b px-8">
			<ul className="flex gap-8">
				<div className="hidden sm:flex">
					<NavItem onClick={() => router.push("/")}>Home</NavItem>
				</div>

				<NavItem onClick={() => router.push("/shop")}>Shop</NavItem>

				<div className="hidden sm:flex gap-8">
					<NavItem>About</NavItem>
					<NavItem>Contact</NavItem>
				</div>
			</ul>

			{isAuthenticated ? (
				<div className="flex gap-2">
					<Avatar
						size="sm"
						imgUrl={user?.photo}
						initials={userInitials}
						onClick={() => router.push("/settings")}
					/>

					<ButtonIcon onClick={() => router.push("/cart")}>
						<ShoppingCart size="1rem" />
					</ButtonIcon>
				</div>
			) : (
				<div className="flex gap-2">
					<Button variant="ghost" onClick={() => router.push("/login")}>
						Sign in
					</Button>

					<Button variant="ghost" onClick={() => router.push("/signup")}>
						Create account
					</Button>
				</div>
			)}
		</nav>
	);
}
