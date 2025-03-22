import { ButtonFull } from "@ui/Button";
import { InputText, InputTextarea } from "@utils/components/input";

function Form() {
	return (
		<form>
			<InputText type="text" id="fullname" placeholder="Name" icon="person" />
			<InputText type="text" id="email" placeholder="Email" icon="send" />
			<InputText
				type="text"
				id="subject"
				placeholder="Subject"
				icon="subject"
			/>
			<InputTextarea placeholder="Message" icon="mail" />
			<ButtonFull className="w-full">Send</ButtonFull>
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
