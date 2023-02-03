import Icon from '@ui/Icon';

function StarBorder() {
    return <span className="material-symbols-outlined stars-star_border">star</span>
}

export default function Stars({ className, total, size = 18, value = 5, displayTotal = true }) {
    const stars = [];

    for (let i = 0; i < parseInt(value); i++)
        stars.push(<Icon className='star' icon='star' key={`Star ${i}`} size={size} />)

    if (value % 1 !== 0)
        stars.push(<Icon className='star' icon='star_half' key={'Star half'} size={size} />)

    for (let i = 0; i < 5 - Math.ceil(value); i++)
        stars.push(<Icon className='star' icon='star_border' key={`Star border ${i}`} size={size} />)

    return <span className={`stars ${className}`}>
        {stars}{displayTotal ? `\u00A0(${total})` : ''}
    </span>
}