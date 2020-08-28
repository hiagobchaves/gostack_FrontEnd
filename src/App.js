import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
        console.log(response);
    })
}, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Luffy',
      url: 'https://github.com/gostack/luffy',
      techs: ['ReactJS', 'React Native']
  });
  setRepositories([... repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);


    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
               <li key={repository.id}>
                 {repository.title}
     
               <button onClick={() => handleRemoveRepository(repository.id)}>
                 Remover
               </button>
             </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
