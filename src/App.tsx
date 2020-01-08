import React, { useState } from 'react'
import './App.css'

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const App: React.FC = () => {
  const [answer, setAnswer] = useState<string>('')

  const handleClick = () => {
    geo()
  }

  const geo = () => {
    navigator.geolocation.getCurrentPosition(function success(position) {
      const { latitude, longitude } = position.coords
      isItRaining(latitude, longitude)
    })
  }

  async function isItRaining(a: number, b: number): Promise<void> {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${a.toString()}&lon=${b.toString()}&APPID=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        const [weather] = data.weather
        const ans: string = weather.main
        setAnswer(ans)
      })
      .catch(err => console.log(err))
  }

  const Answer = (): JSX.Element => {
    const reply =
      answer === ''
        ? ``
        : answer === 'rain'
        ? `Grab y'jacket`
        : `Norr, you're fine pet`
    return <h2>{reply}</h2>
  }

  return (
    <div className='App'>
      <>
        <h1>Is it raining?</h1>
        <button onClick={() => handleClick()}>find out</button>
        <Answer />
      </>
    </div>
  )
}

export default App
