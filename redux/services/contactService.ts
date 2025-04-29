const baseUrl = process.env.NEXT_PUBLIC_SERVER;

export const contactService = {
	contact,
};

async function contact({
	name,
	email,
	subject,
	message,
}: {
	name: string;
	email: string;
	subject: string;
	message: string;
}): Promise<void> {
	await fetch(`${baseUrl}/contact`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name, email, subject, message }),
	});
}
