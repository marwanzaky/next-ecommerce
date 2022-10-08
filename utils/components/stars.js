function Star() {
    return <span class="material-symbols-outlined stars-star-icon">star</span>
}

function Stars({ reviews, displayTotal = true }) {
    return <span className='stars'>
        <Star /><Star /><Star /><Star /><Star />{displayTotal ? `\u00A0(${reviews})` : ''}
    </span>
}

export default Stars;