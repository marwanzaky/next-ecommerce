import React from 'react';

export function InputText({ id, type, placeholder, onChange, icon }) {
    return <div className='input-field'>
        <input type={type} id={id} placeholder={placeholder} onChange={onChange} required />
        <div className='input-field-icon'><span className="material-symbols-outlined">{icon}</span></div>
    </div>
}

export function InputTextarea({ placeholder, icon, minHeight = '150px' }) {
    const style = {
        minHeight
    }

    return <div className='input-field'>
        <textarea placeholder={placeholder} style={style}></textarea>
        <div className='input-field-icon'><span className="material-symbols-outlined">{icon}</span></div>
    </div>
}