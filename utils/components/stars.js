function Star() {
    return <span class="material-symbols-outlined stars-star-icon">star</span>
}

function Stars(props) {
    return <span className='stars'>
        <Star /><Star /><Star /><Star /><Star />&nbsp;({props.reviews})
    </span>
}

export default Stars;