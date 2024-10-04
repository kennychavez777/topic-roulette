import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Typewriter } from "react-simple-typewriter";

import "./App.css";

const randomColors: string[] = [
  "#FF5733", // Rojo brillante
  "#FFBD33", // Naranja brillante
  "#DBFF33", // Amarillo brillante
  "#33FF57", // Verde claro brillante
  "#33DBFF", // Azul claro brillante
  "#3375FF", // Azul brillante
  "#5733FF", // Púrpura brillante
  "#BD33FF", // Violeta brillante
  "#FF9933", // Naranja intenso
  "#33FF99", // Verde lima brillante
];

let data = [
  { option: "Astronomía", style: { backgroundColor: "white" } },
  { option: "Ciencias", style: { backgroundColor: "white" } },
  { option: "Arte", style: { backgroundColor: "white" } },
  { option: "Salud mental", style: { backgroundColor: "white" } },
  { option: "Cambio climático", style: { backgroundColor: "white" } },
  { option: "Música", style: { backgroundColor: "white" } },
  { option: "Cine y televisión", style: { backgroundColor: "white" } },
  { option: "Juegos", style: { backgroundColor: "white" } },
  { option: "Historia", style: { backgroundColor: "white" } },
  { option: "Negocios", style: { backgroundColor: "white" } },
  { option: "Fitnes", style: { backgroundColor: "white" } },
  { option: "Tecnología", style: { backgroundColor: "white" } },
];

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // chat gpt integration variables
  const [response, setResponse] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_CHAT_API_KEY;

  data.forEach((x) => {
    x.style.backgroundColor =
      randomColors[Math.floor(Math.random() * randomColors.length)];
  });

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);

  }

  const fetchPropmt = async () => {
    setMustSpin(false);

    // chat gpt integration
    let prompt = `Dime 10 datos curiosos relacionado al tema de: "${data[prizeNumber].option}"`;
    
    const result = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'babbage-002', // Modelo de OpenAI que desees usar.
        prompt: prompt, // El texto del prompt que quieres enviar a ChatGPT.
        max_tokens: 150, // Puedes ajustar este valor según lo que desees obtener.
      }),
    });

    const r = await result.json();
    setResponse(r.choices[0].text);

    console.log(r, response);
  }

  return (
    <>
      <div>
        <h1
          style={{ paddingTop: "5rem", margin: "auto 0", fontWeight: "bold" }}
        >
          Radio 4x4 <br />
          <span style={{ color: "red", fontWeight: "bold" }}>
            {/* Style will be inherited from the parent element */}
            <Typewriter
              words={[
                "¡Para escuchar!",
                "¡Para disfrutar!",
                "¡Para vivir!",
                "¡Radio todoterreno!",
              ]}
              loop={5}
              cursor
              cursorStyle="_"
              typeSpeed={50}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h1>

        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={fetchPropmt}
        />
        <button className="spin-button" onClick={handleSpinClick}>
          GIRA!
        </button>
      </div>
    </>
  );
}

export default App;
