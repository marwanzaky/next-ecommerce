export function ButtonFull({ className, onClick, children }) {
    return <button className={`btn-base btn-full ${className}`} onClick={onClick}>{children}</button>
}

export function ButtonGhostGrey({ className, onClick, children }) {
    return <button className={`btn-base btn-ghost-grey ${className}`} onClick={onClick}>{children}</button>
}