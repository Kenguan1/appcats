import { createRoot } from 'react-dom/client'
import { App } from './src/App.jsx' 

// En vite los archivos .js no están preparados para funcionar con .jsx
// Cambiamos el archivo de main.js a main.jsx

const root = createRoot(document.getElementById('app'))
// Dentro de la clase app del .html vamos a renderizar el componente App
root.render(<App />)