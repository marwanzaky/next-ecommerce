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