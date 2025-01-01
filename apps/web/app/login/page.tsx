"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useRouter } from "next/navigation";
import { Form } from "@repo/ui/form";
import { Paragraph } from "@repo/ui/paragraph";
import { Header } from "@repo/ui/header";
import { Muted } from "@repo/ui/muted";
import { handleLogin } from "../../utils/authHelpers";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/input-with-label";

export default function Login() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch<AppDispatch>();

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		handleLogin(email, password, dispatch, router);
	};

	return (
		<div className="h-[calc(100vh-14rem)] w-full flex flex-col justify-center items-center px-4">
			<Form onSubmit={onSubmit}>
				<div className="flex flex-col gap-2">
					<Header>Login</Header>
					<Muted>Enter your email below to login to your account</Muted>
				</div>

				<InputWithLabel
					id="email"
					type="email"
					label="Email"
					placeholder="name@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<InputWithLabel
					id="password"
					type="password"
					label="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<Button type="submit">Login</Button>

				<div className="text-center text-sm">
					Don&apos;t have an account?{" "}
					<a
						href="#"
						className="underline underline-offset-4"
						onClick={() => router.push("/signup")}
					>
						Sign up
					</a>
				</div>
			</Form>
		</div>
	);
}
