import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCrypto from "../hooks/useCrypto";
import Error from "./Error";
import axios from "axios";

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size:20px;
    padding:10px;
    background-color:#66A2FE;
    border:none;
    width:100%;
    border-radius:10px;
    color:#FFF;
    transition:background-color .3s ease;
    
    &:hover{
      background-color: #326AC0;
      cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCrypto}) => {
  //state del listado
  const [listaCrypto, guardarCryptos] = useState([])
  const [error, guardarError] = useState(false);
  const MONEDAS = [
    {codigo: 'USD', nombre: 'Dolar Estados Unidos'},
    {codigo: 'MXN', nombre: 'Peso Mexicano'},
    {codigo: 'EUR', nombre: 'Euro'},
    {codigo: 'GNP', nombre: 'Libra Esterlina'},
  ]
  //useMoneda
  const [moneda, SelectMonedas, actualizarState] = useMoneda('Elige tu moneda', '', MONEDAS);

  const [crypto, SelectCrypto] = useCrypto('Elige tu Criptomoneda', '', listaCrypto)
  //ejecutar llamado al api
  useEffect(() => {
    const consultarApi = async () => {
      const config = {
        'Authorization': {
          apiKey: `980bd5c2974e0bbe7a03ac38db3966449dcbcf7e47978e7f22273074e7b661ef`
        }
      }
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`
      const result = await axios.get(url, {headers: config}).catch(err => {
        throw err
      });
      guardarCryptos(result.data[`Data`])
    }
    consultarApi();
  }, []);


  //cuando el usuario hace submit
  const cotizarMoneda = e => {
    e.preventDefault();
    //validar que ambos campos esten llenos

    if (moneda === '' || crypto === '') {
      return guardarError(true);
    }


    guardarError(false);
    guardarMoneda(moneda);
    guardarCrypto(crypto)
  }
  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje='Todos los campos son obligatorios'/> : null}
      <SelectMonedas/>
      <SelectCrypto/>
      <Boton type="submit" value="Calcular"/>
    </form>
  )
}

export default Formulario;
