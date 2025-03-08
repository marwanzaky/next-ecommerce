"use client";

import Layout from "@components/layout";

import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { InputText } from "@utils/components/input";

import { ButtonFull } from "@ui/Button";

import { useDispatch } from "react-redux";
import { handleLogin } from "@utils/authHelpers";

export default function Page() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const onSubmit = async (event) => {
		event.preventDefault();
		handleLogin(email, password, dispatch, router);
	};

	return (
		<Layout title="Sign In">
			<section className="section-signin">
				<div className="section-container">
					<form onSubmit={onSubmit} className="m-auto max-w-[500px]">
						<h4 className="text-center">Sign In</h4>
						<p className="signin-p">
							Sign in to get personalized product recommendations, save and
							synchronize your data across your devices.
						</p>

						<InputText
							type="text"
							id="email"
							placeholder="Enter Email"
							icon="mail"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<InputText
							type="password"
							id="password"
							placeholder="Enter Password"
							icon="password"
							onChange={(e) => setPassword(e.target.value)}
						/>

						<ButtonFull type="submit" className="w-full block mb-[15px]">
							Sign in
						</ButtonFull>

						<p className="text-center">
							Not a member yet?&emsp;
							<Link href="/signup">
								<strong>Sign Up</strong>
							</Link>
						</p>
					</form>
				</div>
			</section>
		</Layout>
	);
}
