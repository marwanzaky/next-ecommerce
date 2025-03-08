import Layout from "@components/layout";
import About from "@components/about";

export default function Page() {
	return (
		process.env.NEXT_PUBLIC_ABOUT === "true" && (
			<Layout title="About">
				<About />
			</Layout>
		)
	);
}
