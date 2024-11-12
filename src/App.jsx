import { useState,useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [schar, setSchar] = useState(false)
  const [password, setPassword] = useState()
  const passRef = useRef(null)

  const passCopyToClipboard = useCallback(() => {
     passRef.current?.select()
     //select range optional 
     passRef.current?.setSelectionRange(0,length)
     // end
     window.navigator.clipboard.writeText(password)
  }, [password])

  const passGenerate = useCallback(() => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(number) str+="0123456789"
      if(schar)  str+="!@#$%&*?="

      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random()*str.length+1)
        pass += str.charAt(char)      
      }
      setPassword(pass)

  }, [length,number,schar,setPassword])

  useEffect(() => {
    passGenerate()
  }, [length,number,schar,passGenerate])

  return (
   
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">

            <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>

            <div className="flex shadow rounded-lg overflow-hidden mb-4">
              <input type="text" value={password} ref={passRef} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly/>
              <button onClick={passCopyToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
            </div>

            <div className='flex text-sm gap-x-2'>

                <div className='flex items-center gap-x-1'>
                  <input type="range" min={6} max={100} value={length} onChange={(e) => {setLength(e.target.value)}} className='cursor-pointer' />
                  <label>Length: {length}</label>
                </div>

                <div className="flex items-center gap-x-1">
                  <input type="checkbox" id="numberInput" defaultChecked={number} onChange={() => {setNumber((prev)=> !prev)}}/>
                  <label htmlFor="numberInput">Numbers</label>
                </div>

                <div className="flex items-center gap-x-1">
                    <input type="checkbox" id="characterInput" defaultChecked={schar} onChange={() => {setSchar((prev) => !prev)}}/>
                    <label htmlFor="characterInput">Characters</label>
                </div>

            </div>
      </div>     
   
  )
}

export default App
