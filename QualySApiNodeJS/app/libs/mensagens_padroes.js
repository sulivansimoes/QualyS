/**
 * @description: Lib contém todas as mensagens padrões do projeto.
 */

 //Operações realizadas com sucesso
const msg_status_1_A = "Registro inserido com sucesso!";
const msg_status_1_B = "Registro deletado com sucesso!";
const msg_status_1_C = "Registro atualizado com sucesso!";
const msg_status_1_D = "Consulta realizada com sucesso!";
//Operações realizadas com erros na plicação
const msg_status_2_A = "Ocorreu um erro ao tentar inserir registro. "; 
const msg_status_2_B = "Ocorreu um erro ao tentar deletar registro. ";
const msg_status_2_C = "Ocorreu um erro ao tentar atualizar o registro. ";
const msg_status_2_D = "Ocorreu um erro ao tentar realizar consulta. ";
//Operações realizadas com problemas oriundos de Parametros enviados na API de forma inválida
const msg_status_3_A = "Conteúdo dos campos inválidos e/ou não preenchidos.";
const msg_status_3_B = "Usuário ou senha inválidos!"

/**
 * Exportando mensagens 
 */
module.exports = {
    msg_status_1_A,
    msg_status_1_B,
    msg_status_1_C,
    msg_status_1_D,

    msg_status_2_A,
    msg_status_2_B,
    msg_status_2_C,
    msg_status_2_D,

    msg_status_3_A,
    msg_status_3_B
}