"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { contactService } from "@redux/services/contactService";
import { Section } from "_shared/components/section";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputText } from "_shared/components/inputText";
import { Textarea } from "_shared/components/textarea";
import { Button } from "_shared/components/button";

type Inputs = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

export default function Contact() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		contactService.contact(data);

		alert("Message sent successfully. Thank you!");
		router.push("/");
	};

	return (
		<Section className="grid grid-cols-1 md:grid-cols-2 gap-[50px]">
			<div>
				<h2>Contact us</h2>
				<h4>Have a question?</h4>
				<p>
					Email us and we&apos;ll get back to you within 24 hours.
					Monday-Saturday <br /> <br />
					Please fill the form below to contact us and we will get back to you
					as soon as possible! We&apos;re happy to answer questions or help.
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<InputText
					type="text"
					placeholder="Name"
					icon="person"
					message={errors.name && "This field is required"}
					{...register("name", { required: true })}
				/>

				<InputText
					type="email"
					placeholder="Email"
					icon="send"
					message={errors.email && "This field is required"}
					{...register("email", { required: true })}
				/>

				<InputText
					type="text"
					placeholder="Subject"
					icon="subject"
					message={
						errors.subject && errors.subject.type === "required"
							? "This field is required"
							: errors.subject && errors.subject.type === "maxLength"
							? "This field must be 64 characters or fewer."
							: ""
					}
					{...register("subject", { required: true, maxLength: 64 })}
				/>

				<Textarea
					styleClass="h-36"
					placeholder="Message"
					icon="mail"
					message={errors.message && "This field is required"}
					{...register("message", { required: true })}
				/>

				<Button size="md" type="submit">
					Send
				</Button>
			</form>
		</Section>
	);
}
