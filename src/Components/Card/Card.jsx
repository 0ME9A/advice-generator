import React, { useEffect, useMemo, useState } from 'react';
import patternDesktop from '../../Assets/pattern-divider-desktop.svg'
import patternMobile from '../../Assets/pattern-divider-mobile.svg'
import './Card.sass'
import diceIcon from '../../Assets/icon-dice.svg'
import { cleanup } from '@testing-library/react';

function Card() {
    const [advice, setAdvice] = useState(0)


    function getAdvice() {
        const axios = require('axios').default;
        axios.get('https://api.adviceslip.com/advice')
            .then((response) => {
                if (response.status === 200) {
                    setAdvice(response)
                }
            })
            .catch((error) => {
                const status = { status: 404 }
                setAdvice(status)
            })

    }


    const diceAdvice = () => {
        getAdvice()
    }



    useEffect(() => {
        getAdvice()
        return ()=>{
            cleanup()
        }
    }, [])

    return (
        <div className='card-container'>
            {
                advice.status === 200 ?
                    <>
                        <h1 className="card-title">Advice #{advice.data.slip.id}</h1>
                        <p className='card-text'>{ advice.data.slip.advice}</p>
                    </>
                    : <span className='loder'>Loading...</span>
            }
            <picture>
                <source media='(min-width:600px)' srcSet={patternDesktop} />
                <img src={patternMobile} alt="divider" />
            </picture>
            <button title='dice' onClick={() => diceAdvice()}>
                <img src={diceIcon} alt="diceIcon" />
            </button>
        </div>
    );
}

export default Card;