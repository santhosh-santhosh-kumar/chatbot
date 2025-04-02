import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User from './Components/User'
import Live from './Components/Live'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex justify-center items-center p-4'>
      <User />
      {/* <Live /> */}
    </div>
    </>
  )
}

export default App
