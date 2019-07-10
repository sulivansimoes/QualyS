/**
 * @description Valida se existe algum elemento do objeto vazio.
 * @param   {JSON } objeto, objeto em formato JSON contendo campos que devem ser validados.
 * @returns {Array} camposVazios, array contendo todas as chaves dos elementos do objeto que se encontram vazios. 
 * @example isObjectEmpty( { nome:"Súlivan", sobrenome:"Simões", idade:"" } )
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

    return camposVazios;
}


/**
 * Exportando funções
 */
module.exports = {
    isObjectEmpty,
}