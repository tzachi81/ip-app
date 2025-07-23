import './AppLoader.css';
import React from 'react';

//I think this is a good practice to add this loader while fetching from an API
//Can be removed
export const AppLoader: React.FC = () => {
  return <div className='loader'></div>;
};

