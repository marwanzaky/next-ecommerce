"use client";

import { useRouter } from "next/navigation";
import { AppDispatch, useAppSelector } from "../redux/store";

import React from "react";
import { selectUserInitials } from "../redux/selectors/authSelectors";
import { BadgeCheck, ChevronsUpDown, LogOut, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch } from "react-redux";
import { logOut } from "redux/slices/authSlice";
import { Separator } from "./ui/separator";

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

	const dispatch = useDispatch<AppDispatch>();

	const { isAuthenticated, user } = useAppSelector(
		(state) => state.authReducer,
	);

	const { items } = useAppSelector((state) => state.cartReducer);

	const userInitials = useAppSelector(selectUserInitials);

	return (
		<nav className="sticky top-0 z-10 bg-white dark:bg-black flex justify-between items-center h-16 border-b px-4">
			<ul className="flex gap-8">
				<div className="hidden sm:flex">
					<NavItem onClick={() => router.push("/")}>Home</NavItem>
				</div>

				<NavItem onClick={() => router.push("/shop")}>Shop</NavItem>

				<div className="hidden sm:flex gap-8">
					<NavItem>About</NavItem>
				</div>
			</ul>

			{isAuthenticated ? (
				<div className="flex gap-2">
					<Button
						className="relative"
						variant="outline"
						size="icon"
						onClick={() => router.push("/cart")}
					>
						<ShoppingCart size="1rem" />

						{items.length > 0 && (
							<span className="absolute -top-1 -right-1 w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
								{items.length}
							</span>
						)}
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="flex gap-2 items-center">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={user?.photo || undefined}
										alt={user?.name}
									/>
									<AvatarFallback className="rounded-lg">
										{userInitials}
									</AvatarFallback>
								</Avatar>

								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{user?.name}</span>
									<span className="truncate text-xs">{user?.email}</span>
								</div>

								<ChevronsUpDown className="ml-auto size-4" />
							</div>
						</DropdownMenuTrigger>

						<DropdownMenuContent
							className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
							side="bottom"
							align="end"
							sideOffset={4}
						>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar className="h-8 w-8 rounded-lg">
										{/* user.avatar */}
										<AvatarImage
											src={user?.photo || undefined}
											alt={user?.name}
										/>
										<AvatarFallback className="rounded-lg">
											{userInitials}
										</AvatarFallback>
									</Avatar>

									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">{user?.name}</span>
										<span className="truncate text-xs">{user?.email}</span>
									</div>
								</div>
							</DropdownMenuLabel>

							<DropdownMenuSeparator />

							<DropdownMenuGroup>
								<DropdownMenuItem onClick={() => router.push("/settings")}>
									<BadgeCheck />
									Account
								</DropdownMenuItem>
							</DropdownMenuGroup>

							<DropdownMenuSeparator />

							<DropdownMenuItem onClick={() => dispatch(logOut())}>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			) : (
				<div className="flex items-center gap-2">
					<Button variant="ghost" onClick={() => router.push("/login")}>
						Sign in
					</Button>

					<Separator orientation="vertical" className="h-5" />

					<Button variant="ghost" onClick={() => router.push("/signup")}>
						Create account
					</Button>
				</div>
			)}
		</nav>
	);
}
