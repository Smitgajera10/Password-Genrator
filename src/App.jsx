import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { Icon } from "@iconify/react";

function App() {
  const [length, setLength] = useState(6)
  const [numberInput, setNumberInput] = useState(true)
  const [charInput, setCharInput] = useState(false)
  const [password, setPassword] = useState("")
  const [buttonText, setButtonText] = useState("Copy")

  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberInput) str += "0123456789"
    if (charInput) str += "!@#$%^&*()"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setPassword(pass)

  }, [length, numberInput, charInput, setPassword]);

  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
    setButtonText("Copied!")
    setTimeout(() => {
      setButtonText("Copy")
    }, 1000);
  }

  useEffect(() => {
    passwordGenrator()
  }, [passwordGenrator])

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen text-black">
        <div className="flex flex-col w-md h-md bg-white justify-center items-center rounded-2xl">
          <img src="lock.svg" className='my-2' />
          <h1 className='text-2xl font-bold'>Password Genrator</h1>
          <div className='my-2 w-[25vw] text-center'>Ensure online account safety by creating strong and secure passwords</div>
          <div className='my-2 flex'>
            <input type="text"
              value={password}
              className="border rounded w-[21vw] py-2 px-3 "
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />

            <button className='ml-5 bg-blue-400 p-2 rounded flex items-center space-x-2'
              onClick={copyPassword}><Icon icon={"solar:copy-bold"} /> {buttonText}</button>
          </div>

          <div className='my-6'>
            <input type="range"
              min={6}
              max={20}
              value={length}
              id='range'
              className='cursor-pointer mr-1'
              onChange={(e) => { setLength(e.target.value) }} />
            <label htmlFor="range">Character Length : {length} </label>
          </div>

          <div className="my-6 flex flex-col">
            <div className='my-1'>
              <label className="switch">
                <input type="checkbox"
                  checked={numberInput}
                  onChange={() => setNumberInput(!numberInput)}
                  id='numberInput' />
                <span className="slider round"></span>
              </label>
              <label htmlFor="numberInput" className="ml-2">Numbers</label>

            </div>

            <div className='my-2'>
              <label className="switch">
                <input type="checkbox"
                  checked={charInput}
                  onChange={() => setCharInput(!charInput)}
                  id='charInput' />
                <span className="slider round"></span>
              </label>
              <label htmlFor="charInput" className="ml-2">Special Characters</label>
            </div>

          </div>

          <button className='px-8 py-2 border rounded mb-10'
          onClick={passwordGenrator}>Refresh</button>
        </div>
      </div>
    </>
  )
}

export default App
