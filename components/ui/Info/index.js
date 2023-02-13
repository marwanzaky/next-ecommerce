import Icon from '@ui/Icon';
import { useState } from 'react';

export default function Info({ display = false, title, children }) {
    const [expand, setExpand] = useState(display);

    const toggleContent = event => {
        event.preventDefault();
        setExpand(!expand);
    };

    return <button className='ui-info'>
        <div className='flex justify-between' onClick={toggleContent}>
            <div className='ui-info-title'>{title}</div>
            <div className='ui-info-icon'><Icon icon={expand ? 'expand_more' : 'expand_less'} /></div>
        </div>
        <div className='ui-info-content' style={{ display: expand ? 'block' : 'none' }}>{children}</div>
    </button>
}