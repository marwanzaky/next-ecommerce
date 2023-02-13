import { useState } from 'react';

export default function Info({ display = false, title, children }) {
    const [contentStyle, setContentStyle] = useState({ display: display ? 'block' : 'none' });

    const toggleContent = event => {
        event.preventDefault();

        const style = {
            display: contentStyle.display === 'none' ? 'block' : 'none'
        };

        setContentStyle(style);
    };

    return <button className='ui-info'>
        <div className='ui-info-title' onClick={toggleContent}>{title}</div>
        <div className='ui-info-content' style={contentStyle}>{children}</div>
    </button>
}