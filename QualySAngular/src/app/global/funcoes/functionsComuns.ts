// COMPONENTES PADRÕES

// COMPONENTES PERSONALIZADOS
import { Perfilusuario } from './perfilUsuario';

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


/**
 * @description Formata data para o formato dd/mm/aaaa
 * @param {String} date data a ser formatada no formato dd/mm/aaaa
 * @returns String  dataFormatada
 */
export function formataData(date:String){


    let dia = date.substr(8,2);
    let mes = date.substr(5,2);
    let ano = date.substr(0,4);
    var dataFormatada = dia+"/"+mes+"/"+ano;

    return dataFormatada;
}


/**
 * @description Direciona o usuário para seu respectivo home. De acordo com seu perfil.
 * @param {number} perfil, código do perfil do usuário
 * @param router, objeto router para poder redirecionar o usuário
 */
export function navigateMenu(perfil:number, router:any){
    
    //verifica o perfil para redirecionar o usuário para home certa
    switch(perfil){

        case Perfilusuario.PERFIL_ADMIN : 
        case Perfilusuario.PERFIL_SUPERVISOR :
        case Perfilusuario.PERFIL_VETERINARIO:

            router.navigate(['/home-grf']);
        break;

        default :
            router.navigate(['/']);
        break;
    } 

}


    