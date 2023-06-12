//HouseCell Component

const HouseCell = ({ type, onClick }) => {
    let cellContent = '';
  
    switch (type) {
      case 'house':
        cellContent = '🏠';
        break;
      case 'restaurant':
        cellContent = '🍔';
        break;
      case 'gym':
        cellContent = '💪';
        break;
      case 'hospital':
        cellContent = '🏥';
        break;
      default:
        cellContent = '';
    }
  
    return (
      <div
        className="flex items-center justify-center w-14 h-14 bg-gray-200 border border-gray-400 cursor-pointer"
        onClick={onClick}
      >
        {cellContent}
      </div>
    );
  };
  
export default HouseCell;
