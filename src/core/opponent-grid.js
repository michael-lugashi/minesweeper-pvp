import React,{useState, useContext, useEffect} from 'react';
import '../styles/board.css';
import OpponentSquare from './opponent-square';
import socketContext from '../contexts/socket-connection/socket-context';

function OpponentGrid(props) {

 const [grid, setGrid] = useState(Array(8).fill(Array(10).fill({})));
 const { socketConnection, roomId } = useContext(socketContext);

 useEffect(() => {
  if (roomId) {
   socketConnection.current.on('update-opponent-grid', ({grid}) => {
    setGrid([...grid]);
   });
  }
 }, [socketConnection, roomId]);

 return (
  <div className='grid'>
   {grid.map((rowOfSquares, rowNum) => {
    return rowOfSquares.map((square, colNum) => {
     return <OpponentSquare square={square} rowNum={rowNum} colNum={colNum} key={`${rowNum}_${colNum}`}/>;
    });
   })}
  </div>
 );
}

export default OpponentGrid;
