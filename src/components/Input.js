import React from 'react';

export function InputText(props) {
    return (
        <div className='input-field'>
            <input type={props.type} id={props.id} placeholder={props.placeholder} />
            <div className='input-field-icon'><span class="material-symbols-outlined">{props.icon}</span></div>
        </div>
    )
}

export function InputTextarea(props) {
    return (
        <div className='input-field'>
            <textarea placeholder={props.placeholder}></textarea>
            <div className='input-field-icon'><span class="material-symbols-outlined">{props.icon}</span></div>
        </div>
    )
}