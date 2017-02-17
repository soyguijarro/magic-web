const capitalizeFirstLetter = string => string[0].toUpperCase() + string.slice(1);

export default string => string.split('-').map(capitalizeFirstLetter).join('');
