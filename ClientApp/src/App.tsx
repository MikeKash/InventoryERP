import React from 'react'


export function App() {

    const fetchForecast = async () => {
          const response = await fetch('weatherforecast')
        const data = await response.json()
        console.log("data", data)
    }

    return (
        <div>
            <div className='text-2xl font-bold'>HOME</div>
            {/* create blue button */}

            <button className='p-2 bg-blue-500 text-white'
                onClick={ ()=>fetchForecast()}
            >Blue Button</button>
        </div>
    )
}
