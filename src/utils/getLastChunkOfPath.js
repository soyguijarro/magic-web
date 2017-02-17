export default path => path.match(/(\/)?[\w-]+(\/)?$/)[0].replace(/\//g, '');
