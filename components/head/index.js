export default function Head({ title }) {
    const name = process.env.NEXT_PUBLIC_NAME;

    return <>
        <title>{title ? `${title} \u2014 ${name}` : name}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
    </>
}