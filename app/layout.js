import Navigation from '../components/navigation';
import Footer from '../components/footer';
import '../styles/globals.css';

export default function RootLayout({ children }) {
    return <html lang='en'>
        <head>
            <title>{process.env.NEXT_PUBLIC_NAME}</title>
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        </head>
        <body>
            <Navigation />
            {children}
            <Footer />
        </body>
    </html>
}