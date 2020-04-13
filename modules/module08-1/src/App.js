import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [tech, setTech] = useState(['React', 'React Native']);
  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('tech');

    if (t) {
      setTech(JSON.parse(t));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
  }, [tech, newTech]);

  const size = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map((t) => (
          <li key="t">{t}</li>
        ))}
      </ul>
      <strong>Você tem {size} tecnologias</strong>
      <br />
      <input type="text" onChange={(e) => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
