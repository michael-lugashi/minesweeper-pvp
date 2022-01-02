import React, { useContext } from 'react';
import YourHeader from './your-header';
import YourGrid from './your-grid';

function YourBoard(props) {
 return (
  <div className='board'>
   <YourHeader />
   <YourGrid />
  </div>
 );
}

export default YourBoard;
