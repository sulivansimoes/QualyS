/**
 * @description Valida se existe algum elemento vazio no objeto.
 * @param   {JSON} objeto, objeto em formato JSON contendo campos que devem ser validados.
 * @returns {JSON} se existir campos vazios, retorna um JSON contendo todas as chaves dos elementos
 *                 que estão vazios. Caso não exista nenhum campo vazio, retorna null.
 * @example 
 * isObjectEmpty( { nome:"Súlivan", sobrenome:"Simões", idade:""} ) //chamada
 * { campos_vazios: [ 'idade' ] } //retorno
 * 
 * @example 
 * isObjectEmpty( { nome:"Súlivan", sobrenome:"Simões", idade:"21"} ) //chamada
 * null //retorno
 * 
 * @see : https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/values
 */
 function isObjectEmpty(objeto){

    let chaves       = []; 
    let valores      = [];
    let camposVazios = [];
    
    //------------------------------------------
    //Percorro o objeto (JSON) para
    //pegar o nome de cada chave 
    //------------------------------------------
    for(let obj in objeto){

        chaves.push(obj);
    }

    //------------------------------------------
    //Pego o valor contido dentro de cada chave 
    //------------------------------------------
    valores = Object.values(objeto);

    //------------------------------------------
    //Verifico quais campos estão vazios
    //------------------------------------------
    for(let i = 0; i < chaves.length; i++){

        if( valores[i].trim() == "" ){

            camposVazios.push(chaves[i]);
        }
    } 

    return ( camposVazios.length > 0 ? { campos_vazios : camposVazios } : null );
}


/**
 * Exportando funções
 */
module.exports = {
    isObjectEmpty,
}