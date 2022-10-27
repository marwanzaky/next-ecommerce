import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

function Stars({ className, total, value = 4.5, displayTotal = true }) {
    const stars = [];

    for (let i = 0; i < parseInt(value); i++)
        stars.push(<StarIcon className='stars-star' />)

    if (value % 1 !== 0)
        stars.push(<StarHalfIcon className='stars-star' />)

    for (let i = 0; i < 5 - Math.ceil(value); i++)
        stars.push(<StarBorderIcon className='stars-star' />)

    return <span className={`stars ${className}`}>
        {stars}{displayTotal ? `\u00A0(${total})` : ''}
    </span>
}

export default Stars;