"use client";

import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";

import { ButtonIcon, ButtonIconImage } from "@ui/Button";

import { useAppSelector } from "@redux/store";

import { useState } from "react";

import { ButtonGhost } from "_shared/components/buttonGhost";
import { Separator } from "_shared/components/separator";

import Overlay from "_shared/components/overlay";

function NavLi({ href, name }: { href: string; name: string }) {
	const pathname = usePathname();
	let select = pathname === href;

	if (href === "/products" && pathname.includes("/product")) select = true;

	return (
		<li>
			<Link className={select ? "select" : ""} href={href}>
				{name}
			</Link>
		</li>
	);
}

export default function Navigation() {
	const router = useRouter();

	const { isAuthenticated, user } = useAppSelector(
		(state) => state.authReducer,
	);
	const { items } = useAppSelector((state) => state.cartReducer);

	const [overlayVisible, setOverlayVisible] = useState(false);

	const signin: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		router.push("/signin");
	};

	const cart: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		router.push("/cart");
	};

	return (
		<nav>
			<div className="nav-promo">Free shipping on orders over $50</div>
			<div className="nav-box">
				<div className="box-left">
					<Link className="logo" href="/">
						{process.env.NEXT_PUBLIC_NAME}
					</Link>
				</div>

				<div className="box-center">
					<ul className="nav-ul">
						<NavLi href="/" name="Home" />
						<NavLi href="/products" name="Shop" />
						{process.env.NEXT_PUBLIC_ABOUT === "true" && (
							<NavLi href="/about" name="About" />
						)}
						<NavLi href="/contact" name="Contact" />
					</ul>
				</div>

				<div className="box-right">
					<div className="flex flex-row">
						<ButtonIcon
							className="btn-cart"
							icon="storefront"
							onClick={() => router.push("/sell")}
						/>

						<ButtonIcon
							className="btn-cart"
							icon="favorite"
							onClick={() => router.push("/favorites")}
						/>

						<ButtonIcon
							className="btn-cart"
							icon="shopping_cart"
							onClick={cart}
						>
							<div
								className="btn-cart-length"
								style={{ display: items.length > 0 ? "flex" : "none" }}
							>
								{items.length}
							</div>
						</ButtonIcon>

						{isAuthenticated
							? process.env.NEXT_PUBLIC_ACCOUNT === "true" && (
									<Overlay
										className="w-fit right-0 flex flex-col py-1 px-1"
										trigger={
											<ButtonIconImage src={user?.photo || "/img/avatar.jpg"} />
										}
										visible={overlayVisible}
										onVisibleChange={(value) => setOverlayVisible(value)}
									>
										<div className="flex flex-col gap-1 py-1.5 px-2">
											<div className="text-xs font-medium text-black leading-none">
												{user?.name}
											</div>
											<div className="text-xs text-gray-500 leading-none">
												{user?.email}
											</div>
										</div>

										<Separator />

										<ButtonGhost
											variant="gray"
											className="text-left"
											onClick={() => {
												router.push("/me");
												setOverlayVisible(false);
											}}
										>
											Settings
										</ButtonGhost>

										<Separator />

										<ButtonGhost
											variant="gray"
											className="text-left"
											onClick={() => {
												window.localStorage.clear();
												location.reload();
											}}
										>
											Log out
										</ButtonGhost>
									</Overlay>
							  )
							: process.env.NEXT_PUBLIC_ACCOUNT === "true" && (
									<ButtonIcon icon="person" onClick={signin} />
							  )}
					</div>
				</div>
			</div>
		</nav>
	);
}
