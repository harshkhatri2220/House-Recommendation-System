import React, { useState } from 'react';
import HouseCell from './HouseCell';

const HouseLayout = () => {
  const [houseLabels, setHouseLabels] = useState({});
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  
 

  const [grid, setGrid] = useState([]);
  
  const handleGridSizeSubmit = () => {
    if (numRows > 0 && numCols > 0) {
      const initialGrid = Array(numRows).fill(Array(numCols).fill(null));
      setGrid(initialGrid);
    }
  };

  const handleCellClick = (rowIndex, colIndex) => {
    const type = prompt('Enter a type (house, restaurant, gym, hospital) for the plot:');
    const label = prompt(`Enter a label for the ${type}:`);

    if (type && label) {
      const lowerCaseType = type.toLowerCase(); // Convert type to lowercase
      if (lowerCaseType === 'house' || lowerCaseType === 'restaurant' || lowerCaseType === 'gym' || lowerCaseType === 'hospital') {
        const updatedGrid = grid.map((row, rIndex) =>
          row.map((cell, cIndex) => {
            if (rIndex === rowIndex && cIndex === colIndex) {
              return lowerCaseType;
            }
            return cell;
          })
        );
        setGrid(updatedGrid);

        const updatedHouseLabels = { ...houseLabels };
        updatedHouseLabels[`${rowIndex}-${colIndex}`] = label;
        setHouseLabels(updatedHouseLabels);
      } else {
        alert('Invalid type entered. Please enter house, restaurant, gym, or hospital.');
      }
    }
  };
  
  

  const calculateScore = (rowIndex, colIndex) => {
    const services = ['restaurant', 'gym', 'hospital'];
    let score = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = rowIndex + i;
        const newCol = colIndex + j;

        if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
          const cell = grid[newRow][newCol];

          if (services.includes(cell)) {
            score++;
          }
        }
      }
    }

    return score;
  };
  
  

  const recommendHouse = () => {
    let bestHouse = '';
    let maxScore = 0;
  
    Object.entries(houseLabels).forEach(([key, label]) => {
      const [rowIndex, colIndex] = key.split('-').map(Number);
      const cell = grid[rowIndex][colIndex];
  
      if (cell === 'house') {
        const score = calculateScore(rowIndex, colIndex);
  
        if (score >= maxScore) {
          maxScore = score;
          bestHouse = label;
        }
      }
    });
  
    if (bestHouse) {
      alert(`Recommended House: ${bestHouse}`);
    } else {
      alert('No houses available');
    }
  };
  
  
  
  

  return (
    <div className="flex flex-col items-center">
      <div className=' flex  border-2 border-solid border-black   justify-center mb-5'>
        <label className=' m-3 '>
          Number of Rows:
          <input
          className=' border-2 border-solid border-black p-1'
            type="number"
            min="1"
            max="10"
            value={numRows}
            onChange={(e) => setNumRows(parseInt(e.target.value))}
          />
        </label >
        <label className=' m-3'>
          Number of Columns:
          <input
            className=' border-2 border-solid border-black p-1'
            type="number"
            min="1"
            max="20"
            value={numCols}
            onChange={(e) => setNumCols(parseInt(e.target.value))}
          />
        </label>
        <button onClick={handleGridSizeSubmit} className="px-2  bg-blue-500 text-white rounded hover:bg-blue-900">Create Grid</button>
      </div>
      <h4>Row Limit : 10 , Coloum Limit : 20</h4>
      <div className="grid gap-2 mb-4">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <HouseCell
                key={colIndex}
                type={cell}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-900"
        onClick={recommendHouse}
      >
        Recommend House
      </button>
    </div>
  );
};

export default HouseLayout;
