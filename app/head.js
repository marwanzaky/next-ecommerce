export default function Head() {
    return <>
        <title>{process.env.NEXT_PUBLIC_NAME}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
    </>
}