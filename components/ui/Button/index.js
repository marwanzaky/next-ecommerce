import Image from 'next/image';
import Icon from '@ui/Icon';

export function ButtonFull({ className, type, onClick, children }) {
    return <button
        className={`btn-base btn-full ${className}`}
        type={type}
        onClick={onClick}>{children}</button>
}

export function ButtonGhostGrey({ className, type, onClick, children }) {
    return <button
        className={`btn-base btn-ghost-grey ${className}`}
        type={type}
        onClick={onClick}>{children}</button>
}

export function ButtonIcon({ className, type, icon, onClick, children }) {
    return <button
        className={`btn-icon-base ${className}`}
        type={type}
        onClick={onClick}>
        <Icon icon={icon} />
        {children}
    </button>
}

export function ButtonIconRed({ className, type, icon, onClick, children }) {
    return <button
        className={`btn-icon-base btn-icon-red ${className}`}
        type={type}
        onClick={onClick}>
        <Icon icon={icon} />
        {children}
    </button>
}

export function ButtonIconImage({ className, type, src, onClick }) {
    return <button
        className={`btn-icon-base ${className}`}
        type={type}
        onClick={onClick}>
        <Image className='rounded-full !filter-none' src={src} width={24} height={24} alt='Icon' />
    </button>
}