"use client";

import Layout from "@components/layout";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useDispatch } from "react-redux";
import { handleLogin } from "@utils/authHelpers";
import { InputText } from "_shared/components/inputText";
import { Button } from "_shared/components/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Section } from "_shared/components/section";

type Inputs = {
	email: string;
	password: string;
};

export default function Page() {
	const router = useRouter();

	const { register, handleSubmit } = useForm<Inputs>();

	const dispatch = useDispatch();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		handleLogin(data.email, data.password, dispatch, router);
	};

	return (
		<Layout title="Sign In">
			<Section>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="m-auto max-w-[500px]"
				>
					<h4 className="text-center">Sign In</h4>
					<p className="text-center text-grey mb-8">
						Sign in to get personalized product recommendations, save and
						synchronize your data across your devices.
					</p>

					<div className="flex flex-col gap-4">
						<InputText
							type="text"
							placeholder="Enter Email"
							icon="mail"
							required
							{...register("email", { required: true })}
						/>
						<InputText
							type="password"
							placeholder="Enter Password"
							icon="password"
							required
							{...register("password", { required: true })}
						/>

						<Button size="md" type="submit">
							Sign in
						</Button>

						<p className="text-center">
							Not a member yet?&emsp;
							<Link href="/signup">
								<strong>Sign Up</strong>
							</Link>
						</p>
					</div>
				</form>
			</Section>
		</Layout>
	);
}
