//https://nodejs.org/api/crypto.html#crypto_crypto
// const crypto = require('crypto');

// const secret = 'senha';
// const hash = crypto.createHash('MD5')
//                    .update(secret)
//                    .digest('hex');

// console.log(hash);
                   //--------------------
// crypto.createHmac('MD5', secret)
//                    .update('I love cupcakes')
//                    .digest('hex');
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e

// var myobj = {
//                 a : 5,
//                 b : 12
//             };

// //Removendo a propriedade a, deixando myobj com apenas a propriedade b.
// delete myobj.b;
// delete  myobj.a
// console.log (myobj) // yields "false"





///funcção para validar
    let chaves       = []; 
    let valores      = [];
    let camposVazios = [];

    let objeto       = {id:"dsfada",nome:"sulivan", sobrenome:""}
    let naoValida    = ['sobrenome',"nome"]

    //------------------------------------------
    //Retiro os elementos que não são para ser
    //validados
    //------------------------------------------
    // for(let i in naoValida){

        let teste = "delete objeto."+naoValida[1] //+ naoValida[0] + 
       
        console.log("caralho: "+teste);
         eval(teste)
       
    // }


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

    console.log(objeto);
    console.log("camposVazios: " + camposVazios);

    