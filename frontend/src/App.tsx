import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import 'primereact/resources/themes/soho-dark/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + PrimeReact</h1>
            <div>
                <h2>PrimeReact Typescript Issue Template</h2>
                <p>
                    Please create a test case and attach the link to the to your github
                    issue report.
                </p>
            </div>
            <div className="card">
                <InputText
                    disabled={true}
                    value={count.toString()}
                />
                <Button
                    icon="pi pi-plus"
                    label="Increment"
                    onClick={() => setCount((count) => count + 1)}
                ></Button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test PrimeReact
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    </>
  )
}

export default App
