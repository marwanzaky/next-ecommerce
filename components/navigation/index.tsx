"use client";

import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";

import { ButtonIcon, ButtonIconImage } from "@ui/Button";

import { useAppSelector } from "@redux/store";

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

	const signin: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		router.push("/signin");
	};

	const cart: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		router.push("/cart");
	};

	const me: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		router.push("/me");
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
						{isAuthenticated
							? process.env.NEXT_PUBLIC_ACCOUNT === "true" && (
									<ButtonIconImage
										src={user?.photo || "/img/avatar.jpg"}
										onClick={me}
									/>
							  )
							: process.env.NEXT_PUBLIC_ACCOUNT === "true" && (
									<ButtonIcon icon="person" onClick={signin} />
							  )}

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
					</div>
				</div>
			</div>
		</nav>
	);
}
