const baseUrl = process.env.NEXT_PUBLIC_SERVER;

export const paymentsService = {
	createCheckoutSession,
};

async function createCheckoutSession(
	items: {
		id: string;
		quantity: number;
	}[],
): Promise<{ url: string }> {
	const response = await fetch(`${baseUrl}/payments/create-checkout-session`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ items }),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
