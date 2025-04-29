"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { ButtonFull } from "@ui/Button";
import { InputText, InputTextarea } from "@utils/components/input";
import { contactService } from "@redux/services/contactService";

function Form() {
	const router = useRouter();

	const [name, setName] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [subject, setSubject] = useState<string>();
	const [message, setMessage] = useState<string>();

	const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		if (name && email && subject && message) {
			contactService.contact({ name, email, subject, message });
			alert("Message sent successfully. Thank you!");
			router.push("/");
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<InputText
				type="text"
				id="name"
				placeholder="Name"
				icon="person"
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<InputText
				type="text"
				id="email"
				placeholder="Email"
				icon="send"
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<InputText
				type="text"
				id="subject"
				placeholder="Subject"
				icon="subject"
				onChange={(e) => setSubject(e.target.value)}
				required
			/>
			<InputTextarea
				id="message"
				placeholder="Message"
				icon="mail"
				onChange={(e) => setMessage(e.target.value)}
				required
			/>

			<ButtonFull type="submit" className="w-full">
				Send
			</ButtonFull>
		</form>
	);
}

export default function Contact() {
	return (
		<section className="section-contact-me">
			<div className="contact-me-box">
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

				<Form />
			</div>
		</section>
	);
}
