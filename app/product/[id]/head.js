import _Head_ from '@components/head';

export default function Head() {
    return <>
        {/* <title>{title ? `${title} \u2014 ${process.env.NEXT_PUBLIC_NAME}` : 'Mamolio'}</title> */}
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
    </>
}