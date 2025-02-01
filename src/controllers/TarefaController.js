const ResponseModel = require("../models/ResponseModel");
const TarefaService = require("../services/TarefaService");
const MessageModel = require("../models/MessageModel");

class TarefaController {
    async getTarefa(req, res) {
        try{
            const { compromisso_id } = req.params; 
            const result = await TarefaService.getTarefa(compromisso_id);
            const response = ResponseModel(
                200,
                result,
                MessageModel.getSucess("tarefa")
            );
            res.status(200).send(response);
        } catch (error){
            console.log(error);
            const response = ResponseModel(404, null, MessageModel.getFail("tarefa"));
            res.status(404).send(response);
        }
    }

    async postTarefa(req, res) {
        try{
            const { compromisso_id } = req.params;
            const { descricao, status, dataConclusao } = req.body;
            const result = await TarefaService.postTarefa(
                compromisso_id,
                descricao,
                status,
                dataConclusao
            );
            const response = ResponseModel(
                201,
                result,
                MessageModel.postSucess("tarefa")
            );
            res.status(201).send(response);
        }catch (error){
            console.log(error);
            const response = ResponseModel(404, null, MessageModel.postFail("tarefa"));
            res.status(404).send(response);
        }
    }

    async putTarefa(req, res) {
        try{
            const { tarefa_id } = req.params;
            const { descricao, status, dataConclusao } = req.body;
            const result = await TarefaService.putTarefa(
                tarefa_id,
                descricao,
                status,
                dataConclusao
            );
            const response = ResponseModel(
                200,
                result,
                MessageModel.putSucess("tarefa")
            );
            res.status(200).send(response);
        }catch (error){
            console.log(error);
            const response = ResponseModel(404, null, MessageModel.putFail("tarefa"));
            res.status(404).send(response);
        }
    }

    async deleteTarefa(req, res) {
        try{
            const { tarefa_id } = req.params;
            const result = await TarefaService.deleteTarefa(
                tarefa_id
            );
            const response = ResponseModel(
                200,
                result,
                MessageModel.deleteSucess("tarefa")
            );
            res.status(200).send(response);
        } catch(error){
            console.log(error);
            const response = ResponseModel(404, null, MessageModel.deleteFail("tarefa"));
            res.status(404).send(response);
        }
    }
}

module.exports = new TarefaController();