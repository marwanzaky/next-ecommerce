"use client";

import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../redux/store";

import React, { useEffect, useState } from "react";
import { Avatar } from "@repo/ui/avatar";
import { selectUserInitials } from "../redux/selectors/authSelectors";

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
		<nav className="flex justify-between items-center h-16 border-b px-8">
			<ul className="flex gap-8">
				<NavItem onClick={() => router.push("/")}>Home</NavItem>
				<NavItem>Shop</NavItem>
				<NavItem>About</NavItem>
				<NavItem>Contact</NavItem>
			</ul>

			{isAuthenticated ? (
				<div className="flex gap-2">
					<Avatar
						imgUrl={user?.photo}
						initials={userInitials}
						// fallbackImgUrl="img/avatar-placeholder.png"
						onClick={() => router.push("/settings")}
					/>
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
