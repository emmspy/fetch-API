import { useState, useEffect } from "react";

function App() {
  const [catFact, setFact] = useState("");
  const [catImageUrl, setCatImageUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const randomErrorCode = Math.floor(Math.random() * 11) + 400;
        const response = await fetch(`https://http.cat/${randomErrorCode}`);
        if (!response.ok) {
          throw new Error("Error al obtener la imagen");
        }
        // Si la respuesta es exitosa, establecer la URL de la imagen
        setCatImageUrl(response.url);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchFact() {
      try {
        const response = await fetch("https://catfact.ninja/fact");
        if (!response.ok) {
          throw new Error("Error al obtener el hecho del gato");
        }
        const data = await response.json();
        setFact(data.fact);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
    fetchFact();
  }, []);

  return (
    <>
      <h1>  HTTP errors with cats</h1>
      {catFact && <p>{catFact}</p>}
      {catImageUrl && (
        <img src={catImageUrl} alt="cat"  />
      )}
    </>
  );
}

export default App;
