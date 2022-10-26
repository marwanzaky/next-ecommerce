export function BtnIcon({ className, icon, onClick }) {
    return <button className={`${className} btn-icon`} onClick={onClick}>
        <span className='material-symbols-outlined'>{icon}</span>
    </button>
}