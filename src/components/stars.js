import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Star() {
    return <FontAwesomeIcon className='save-icon' icon={faStar} />;
}

function Stars(props) {
    const style = {
        fontSize: '100%',
        fontWeight: 'bold'
    }

    return <span className='stars' style={style}>
        <Star /> <Star /> <Star /> <Star /> <Star /> 5 ({props.reviews})
    </span>;
}

export default Stars;