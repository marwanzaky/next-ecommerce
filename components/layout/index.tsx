import Navigation from "@components/navigation";
import Footer from "@components/footer";

type LayoutProps = {
	title?: string;
	children: React.ReactNode;
};

export default function Layout({ children, title }: LayoutProps) {
	const name = process.env.NEXT_PUBLIC_NAME;

	return (
		<div className="layout">
			<title>{title ? `${title} \u2014 ${name}` : name}</title>

			<Navigation />
			{children}
			<Footer />
		</div>
	);
}
