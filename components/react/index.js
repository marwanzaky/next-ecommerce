'use client';

import { useState, useEffect, useRef } from "react";

export default function App() {
    const [inputValue, setInputValue] = useState("");
    // const [count, setCount] = useState(0);   // INFINIT LOOP!
    const count = useRef(0);

    useEffect(() => {
        // setCount(cur => cur + 1);
        count.current = count.current + 1;
    });

    return (
        <>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            {/* <h1>Render Count: {count}</h1> */}
            <h1>Render Count: {count.current}</h1>
        </>
    );
}