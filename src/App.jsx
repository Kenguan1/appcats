import { useEffect, useState } from "react"
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`
// const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()

    // una Promesa no espera a que se complete una operación y se puede continuar ejecutando el código
    
    useEffect(()=>{ 
        fetch(CAT_ENDPOINT_RANDOM_FACT) // llamando al método fetch, devuelve una Promesa que representa la respuesta de la solicitud HTTP. Si la promesa se ejecuta con éxito se ejecutan los .then() si devuelve error los .catch()
            .then(res => res.json()) //cuando resolvemos la promesa tenemos la respuesta que la pasamos a .json
            .then(data => {
                const { fact } = data // data tiene 'fact' y 'length' pero sólo recuperamos el 'fact' para luego manipularlo y agarrar la primera palabra
                setFact(fact)

            })
    }, []) 
// muy importante usar useEffect con este '[]' para que no haya un loop infinito, ya que hace que el efecto sólo se ejecuta la primera vez que renderizamos el componente
// El nombre del parámetro utilizado en el segundo método .then() es solo una convención y puede ser cualquier nombre válido de variable de JavaScript. Lo importante es que el segundo método .then() recibe el resultado del primer método .then() y puede procesarlo o utilizarlo para actualizar el estado del componente.

    useEffect(()=>{
        if(!fact) return // si no tenemos un fact retornamos esto, el estado inicial de fact es vacio (line 9) por lo que se necesita de este condicional
        
        const threeFirstWords = fact.split(' ', 3).join(' ') //agarramos del string las primeras 3 palabras que esten separadas por ' ', y luego las reagrupamos con .join(' ') tambien con espacios
        console.log(threeFirstWords)

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`) // se manda solicitud a la API para que nos de un json con un gato custom
            .then(res => res.json()) // respuesta de la solicitud a la API y tomamos la info para luego tener la url de la imagen
            .then(response => {
                const { url } = response  //de la response vamos a tomar solo la url
                setImageUrl(`https://cataas.com${url}`) // ya que la url dentro del objeto no contiene el prefijo la escribimos así, y actualizamos la img
            })
    }, [fact]) // cada vez que se actualice fact, vamos a utilizar este effect de recuperar la img

    return(
        <main>
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>} {/* Si fact tiene un valor definido, se renderiza un elemento p que contiene el valor de fact. Si fact es undefined o false, no se renderiza ningún elemento. */}
            {imageUrl && <img src={imageUrl} alt={`image extracted using the first three words of ${fact}`} /> }
        </main>
    )
}