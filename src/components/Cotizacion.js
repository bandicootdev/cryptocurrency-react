import React from "react";
import styled from "@emotion/styled";

const ResultadoDiv = styled.div`
    color:#FFF;
    font-family:Arial,Helvetica,sans-serif;
`;

const Info = styled.p`
    font-size18px;
    span{
      font-weight:bold;
    }
`;

const Precio = styled.p`
    font-size:30px;
    span{
      font-weight:bold;
    }
`;
const Cotizacion = ({resultado}) => {
  if (Object.keys(resultado).length === 0) return null;
  return (
    <ResultadoDiv>
      <Precio>El Precio es: <span>{resultado[`PRICE`]}</span></Precio>
      <Info>Precio mas Alto del Dia: <span>{resultado[`HIGHDAY`]}</span></Info>
      <Info>Precio mas Bajo del Dia:: <span>{resultado[`LOWDAY`]}</span></Info>
      <Info>Variacion ultimas 24 horas: <span>{resultado[`CHANGEPC24HOUR`]}</span></Info>
      <Info>Ultima Actualizacion <span>{resultado[`LASTUPDATE`]}</span></Info>
    </ResultadoDiv>
  );
}

export default Cotizacion;
