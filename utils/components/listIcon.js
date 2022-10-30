import Link from 'next/link';

export default function ListIcon({ className, href, icon, children }) {
    return <Link href={href} className={`li-icon ${className}`}>
        <span className='material-symbols-outlined'>{icon}</span>
        {children}
    </Link>
}