import React from 'react';

function Nav(props) {
    return <li>
        <button>{props.name}</button>
    </li>
}

function Navigation() {
    return <nav className='container'>
        <div className="main-nav-box">
            <button className="logo">Mamolio</button>

            <ul className="main-nav">
                <Nav name='Home' />
                <Nav name='Shop' />
                <Nav name='Contact' />
            </ul>

            <button></button>
        </div>
    </nav>
}

export default Navigation;