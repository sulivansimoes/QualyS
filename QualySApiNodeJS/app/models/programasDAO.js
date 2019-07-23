//Bibliotecas
const topConnection                    = require("./processosPG");
const {msg_status_1_A, msg_status_2_A} = require("./../libs/mensagens_padroes"); 
const {msg_status_1_B, msg_status_2_B} = require("./../libs/mensagens_padroes"); 
const {msg_status_1_C, msg_status_2_C} = require("./../libs/mensagens_padroes"); 
const {msg_status_1_D, msg_status_2_D} = require("./../libs/mensagens_padroes"); 

class ProgramasDAO{

    /**
     * @constructor
     */
    constructor(){
                 
    }
    

    /**
     * @description : Salva novo programa no banco de dados.
     * @param programa, objeto contendo informações do novo programa que deverá ser salvo.
     * @param response, objeto de response da requisição.
     * @obs   o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaPrograma(programa, response){

        let cSql    = "INSERT INTO programas(descricao, sigla, data_vigencia, data_revisao, versao, oficio, bloqueado) "
                    + " VALUES(                    " 
                    + "         UPPER( TRIM($1) ), "   //[01]-descricao                          
                    + "         UPPER( TRIM($2) ), "   //[02]-sigla
                    + "         $3               , "   //[03]-data_vigencia
                    + "         $4               , "   //[04]-data_revisao
                    + "         UPPER( TRIM($5) ), "   //[05]-versao
                    + "         TRIM($6)         , "   //[06]-oficio
                    + "         $7                 "   //[07]-bloqueado
                    + "        )                   "

        let aValues = [ 
                        programa.descricao    ,   //[01]
                        programa.sigla        ,   //[02]
                        programa.data_vigencia,   //[03]
                        programa.data_revisao ,   //[04]
                        programa.versao       ,   //[05]
                        programa.oficio       ,   //[06]
                        programa.bloqueado    ,   //[07]
                      ];

        topConnection.executaQuery(cSql, aValues, response, msg_status_1_A, msg_status_2_A);                      
    }    


    /**
     * @description: Atualiza programa no banco de dados.
     * @param {*} programa,  programa que deve ser alterado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    atualizaPrograma(programa, response){
       
        let cSql    = "UPDATE programas SET                "
                    + " descricao     = UPPER( TRIM($1) ), "    //[01]   
                    + " sigla         = UPPER( TRIM($2) ), "    //[02]
                    + " data_vigencia = $3               , "    //[03]
                    + " data_revisao  = $4               , "    //[04]
                    + " versao        = UPPER( TRIM($5) ), "    //[05]
                    + " oficio        = TRIM($6)         , "    //[06]
                    + " bloqueado     = $7                 "    //[07]
                    + " WHERE id      = $8                 "    //[08]
                    
        let aValues = [ 
                        programa.descricao    ,   //[01]
                        programa.sigla        ,   //[02]
                        programa.data_vigencia,   //[03]
                        programa.data_revisao ,   //[04]
                        programa.versao       ,   //[05]
                        programa.oficio       ,   //[06]
                        programa.bloqueado    ,   //[07]
                        programa.id               //[08]
                      ];

        topConnection.executaQuery(cSql, aValues, response, msg_status_1_C, msg_status_2_C);                                            
    }  
    
    
    /**
     * @description: Deleta programa do banco de dados.
     * @param {*} idPrograma, id do programa que deve ser deletado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    deletaPrograma(idPrograma, response){

        let cSql    = "DELETE FROM programas WHERE id = $1";
        let aValues = [ idPrograma ];
         
        topConnection.executaQuery(cSql, aValues, response, msg_status_1_B, msg_status_2_B);             
    }


    /**
     * @description Consulta todos os programas no banco de dados
     * @param {response} response 
     */
    getAllProgramas(response){

        let cSql    =  "SELECT id , "
                    +  "       descricao, " 
                    +  "       sigla, "
                    +  "       data_vigencia ,"
                    +  "       data_revisao  ,"
                    +  "       versao, "
                    +  "       oficio, "
                    +  "       bloqueado "
                    +  " FROM programas "
                    +  " ORDER BY id "

        topConnection.executaQuery(cSql, [],  response, msg_status_1_D, msg_status_2_D);      
    }   
    
    
    /**
     * @description Consulta os programas no banco de dados por descrição
     * @param {String  } descricao, descricao à ser pesquisada.
     * @param {response} response 
     */
    getProgramasPorDescricao(descricao , response){

        let cSql    =  "SELECT id          , descricao, sigla , data_vigencia, "
                    +  "       data_revisao, versao   , oficio, bloqueado "
                    +  " FROM programas "
                    +  " WHERE descricao LIKE UPPER('%' || $1 || '%')"
                    +  " ORDER BY id "              

        let aValues = [ descricao ];

        topConnection.executaQuery(cSql, aValues,  response, msg_status_1_D, msg_status_2_D);      
    }       
}


/**
 * Exportando instancia da classe
 */
module.exports = function(){
    return ProgramasDAO;
}