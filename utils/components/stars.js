function Star() {
    return <span className="material-symbols-outlined stars-star-icon">star</span>
}

function StarHalf() {
    return <span className="material-symbols-outlined stars-star-icon">star_half</span>
}

function Stars({ className, total, value = 5, displayTotal = true }) {
    const stars = [];

    for (let i = 0; i < value; i++)
        stars.push(<Star />)

    if (value % 1 !== 0)
        stars.push(<StarHalf />)

    return <span className={`${className} stars`}>
        {stars}{displayTotal ? `\u00A0(${total})` : ''}
    </span>
}

export default Stars;