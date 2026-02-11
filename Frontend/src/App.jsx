import { useState } from "react";

function App() {
  const [text, setText] = useState("");

  const saveData = async () => {
    await fetch(`http://127.0.0.1:8000/save?text=${text}`, {
      method: "POST",
    });
    setText("");
    alert("Saved");
  };

  return (
    <div style={{ padding: 20 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={saveData}>Save</button>
    </div>
  );
}

export default App;
