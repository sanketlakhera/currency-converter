import { useState } from 'react'
import './App.css'

const API_KEY = "cur_live_fAQ3sUw2RgFGNuTjM0nAXeeNsYZriY1fo1F8CzYJ";

const exchangeRateUrl = "https://api.currencyapi.com/v3/latest?base_currency=";

function App() {
  const currency = [
    "USD",
    "INR",
    "AED"
  ]

  const [inputCurrency, setInputCurrency] = useState("INR");

  const [outputCurrency, setOutputCurrency] = useState("USD");
  const [input, setInput] = useState(0);
  const [output, setOutput] = useState(0);

  const handleConvert = () => {
    fetch(`${exchangeRateUrl}${inputCurrency}`, {
      headers: {
        "apikey": API_KEY
      },
      method: "GET"
      // body: JSON.stringify(input)
    })
      .then(res => res.json())
      .then(data => {
        console.log("response from api: ", data);
        console.log(data.data[outputCurrency]?.value);
        setOutput(data.data[outputCurrency].value * input);
      }
      )
    // console.log(input, output);
  }

  return (
    <>
      <div className="outer">
        <h1>Currency Converter</h1>
        <div className="inner">
          <p>Amout</p>
          <select name="" id="" className="form-select"
            onChange={(e) => { setInputCurrency(e.target.value) }}
          >
            {currency.map(c => <option key={c} value={inputCurrency}>{c}</option>)}
          </select>
          <input
            type="number" className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {/* button */}
          <p>Converted Amout</p>
          <select name="" id="" className="form-select"
            onChange={(e) => { setOutputCurrency(e.target.value) }}
          >
            {currency.map(c => <option key={c} value={outputCurrency}>{c}</option>)}
          </select>
          {/* need to multiply by value from api */}
          <input type="number" className="form-control"
            value={output}
            onChange={(e) => setOutput(e.target.value)} />
        </div>
        <br />
        <button type="button" className="btn btn-primary"
          onClick={handleConvert}>Convert</button>
        <p>Indicative exchange rate</p>
        <p>1 {inputCurrency} = {output} {outputCurrency} </p>
      </div>
    </>
  )
}

export default App
