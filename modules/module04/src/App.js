import React from 'react';

import './App.css';
import TechList from './components/TechList';
import profile from './assets/db543fead484523da94a75cbfc4f1349.jpeg';

function App() {
    return <>
        <h1>Hello Developer</h1>
        <img src={profile} width="200" />
        <TechList />
    </>
}

export default App;