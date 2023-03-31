import { useState } from 'react';

export const useCounter = ( count = 10 ) => {

    const [ counter, setCounter ] = useState(count);

    const incrementCounter = () => {
        setCounter(counter + count);
    }

    return {
        counter,
        incrementCounter,
    };
}