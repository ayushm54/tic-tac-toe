import React from "react"
import "./square.css"
const Square = ({value, onClick, isGameStarted}) =>{
   return( 
   <button onClick={onClick} className="square" disabled={!isGameStarted} style={{cursor: isGameStarted ? 'pointer': 'unset'}}>{value}</button>
   );
}

export default Square;