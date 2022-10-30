import Image from 'next/image'

export function BtnIcon({ className, icon, onClick }) {
    return <button className={`${className} btn-icon`} onClick={onClick}>
        <span className='material-symbols-outlined'>{icon}</span>
    </button>
}

export function BtnImg({ className, src, onClick }) {
    return <button className={`${className} btn-icon`} onClick={onClick}>
        <Image src={src} width='24' height='24' />
    </button>
}