import React from "react"
import "./styles/headStyle.css"
import Weather from "./components/Weather.jsx"
import Footer from "./components/Footer.jsx"
const App = () => {
  return (
    <div className="body-wrapper">
      <section className="head">
        <h1>This App Was Made <br />Using Android.</h1>
      <p>
        Fun project that shows current weather.
      </p>
    </section>
    <Weather />
    <Footer />
  </div>
)}

export default App