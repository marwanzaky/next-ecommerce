import Icon from "@ui/Icon"

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

export function ButtonIcon({ className, type, icon, onClick }) {
    return <button
        className={`btn-icon-base ${className}`}
        type={type}
        onClick={onClick}>
        <Icon icon={icon} />
    </button>
}

export function ButtonIconRed({ className, type, icon, onClick }) {
    return <button
        className={`btn-icon-base btn-icon-red ${className}`}
        type={type}
        onClick={onClick}>
        <Icon icon={icon} />
    </button>
}