import "./App.css";
import { useState, useRef } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const teamRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(teamRef.current.value);
    await axios
      .post("http://localhost:5000/api/", { club: teamRef.current.value })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <h1>World of football</h1>
      <form onSubmit={handleSubmit}>
        <select required ref={teamRef}>
          <option></option>
          <option value="Borussia_Dortmund">Borussia Dortmund</option>
          <option value="FC_Barcelona">FC Barcelona</option>
          <option value="Real_Madrid_CF">Real Madrid</option>
          <option value="A.C._Milan">AC Milan</option>
          <option value="Atlético_Madrid">Atlético de Madrid</option>
          <option value="FC_Bayern_Munich">Bayern Munich</option>
          <option value="Liverpool_F.C.">Liverpool</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
      {data && (
        <div>
          <h1>{teamRef.current.value}</h1>
          <ul>
            {data.map((e, i) => {
              return (
                <li key={i}>
                  {e.name.value}, {e.number.value}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
