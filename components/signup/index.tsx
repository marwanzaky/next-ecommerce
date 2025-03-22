"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { InputText } from "@utils/components/input";
import { ButtonFull } from "@ui/Button";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { signupAsync } from "@redux/thunks/authThunks";

export default function Signup() {
	const router = useRouter();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch<AppDispatch>();

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		if (password === confirmPassword) {
			dispatch(signupAsync({ name, email, password, router }));
		} else {
			alert("The passwords you entered do not match");
		}
	};

	return (
		<section className="section-signup">
			<div className="section-container">
				<form onSubmit={onSubmit} className="m-auto max-w-[500px]">
					<h4 className="text-center">Sign Up</h4>
					<p className="signup-p">
						Create an account to unlock all the benefits to easily save and
						synchronize your data across your devices.
					</p>

					<InputText
						type="text"
						id="name"
						placeholder="Enter Name"
						icon="person"
						onChange={(e) => setName(e.target.value)}
					/>
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
					<InputText
						type="password"
						id="passwordConfirm"
						placeholder="Repeat Password"
						icon="password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>

					<ButtonFull type="submit" className="w-full block mb-[15px]">
						Sign up
					</ButtonFull>

					<p className="text-center">
						Have an account?&emsp;
						<Link href="/signin">
							<strong>Sign In</strong>
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
}
