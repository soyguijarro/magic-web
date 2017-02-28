import capitalizeFirstLetter from './capitalizeFirstLetter';

export default string => string.split('-').map(capitalizeFirstLetter).join('');
