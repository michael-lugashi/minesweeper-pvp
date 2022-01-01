import React from 'react';
import OpponentHeader from './opponent-header';
import OpponentGrid from './opponent-grid';

function OpponentBoard(props) {
 return (
  <div className='board'>
   <OpponentHeader />
   <OpponentGrid />
  </div>
 );
}

export default OpponentBoard;
