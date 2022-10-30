export default function RootLayout({ children }) {
    return <html lang='en'>
        <head>
            <title>{process.env.NEXT_PUBLIC_NAME}</title>
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        </head>
        <body>{children}</body>
    </html>
}