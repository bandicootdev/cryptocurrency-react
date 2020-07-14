import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from "./components/Cotizacion";
import axios from "axios";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
     max-width:900px;
     margin:0 auto;
     @media(min-width:992px){
        display:grid;
        grid-template-columns: repeat(2,1fr);
        column-gap:2em;
     }
`;

const Imagen = styled.img`
    max-width:100%;
    margin-top:5rem;
`;

const Heading = styled.h1`
  font-family:'Bebas Neue', cursive;
  color:#FFF;
  text-align:left;
  font-weight:700px;
  font-size:50px;
  margin-bottom:50px;
  margin-top:80px;
  
  &::after{
    content:'';
    width:100px;
    height:6px;
    background-color:#66A2FE;
    display:block;
  }
`;

function App() {
  const [moneda, guardarMoneda] = useState('');
  const [crypto, guardarCrypto] = useState('');
  const [resultado, guardarResultado] = useState({})
  const [cargando, guardarCargando] = useState(false);
  useEffect(() => {
    const cotizarCrypto = async () => {
      if (moneda === '') return;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}`;
      const config = {
        'Authorization': {
          apiKey: `980bd5c2974e0bbe7a03ac38db3966449dcbcf7e47978e7f22273074e7b661ef`
        }
      }
      const resultado = await axios.get(url, {headers: config})
      guardarCargando(true);
      setTimeout(() => {
        guardarCargando(false);
        guardarResultado(resultado.data[`DISPLAY`][crypto][moneda])
      }, 3000)
    }
    cotizarCrypto();
  }, [moneda, crypto])

  const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado}/>
  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="img"/>
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCrypto={guardarCrypto}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
