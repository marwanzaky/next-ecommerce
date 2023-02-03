import Image from 'next/image';

export default function Icon({ className, icon, size = 24 }) {
    return <Image
        className={`icon ${className}`}
        src={`/assets/${icon}.svg`}
        alt={icon}
        width={size}
        height={size} />
}