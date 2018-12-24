/**
 * @description: Converte um objeto ou array de objetos em um array de valores
 * @param  {Object} ( objeto ) - Objeto ou Array de objetos a ser convertido.
 * @return {Array}  ( array  ) - Array contendo somente valores do objeto.
 * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/values  
 */
export function parseObjectsToArray( objeto:any ){

    let array = [];

    for(let i in objeto){
        array.push( Object.values( objeto[i] ));
    }    
    return array;
}
    