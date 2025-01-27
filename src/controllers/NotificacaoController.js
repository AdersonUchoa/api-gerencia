const ResponseModel = require("../models/ResponseModel");
const NotificacaoService = require("../services/NotificacaoService");
const MessageModel = require("../models/MessageModel");

class NotificacaoController {
    async getNotificacao(req, res) {
        try{
            const result = await NotificacaoService.getNotificacao();
            const response = ResponseModel(
                200,
                result,
                MessageModel.getSucess("notificacao")
            );
            res.status(200).send(response);
        } catch (error){
            console.log(error);
            const response = ResponseModel(404, null, MessageModel.getFail("notificacao"));
            res.status(404).send(response);
        }
    }

    async postNotificacao(req, res) {
        try{
            const { compromisso_id, titulo, descricao } = req.body;
            const result = await NotificacaoService.postNotificacao(
                compromisso_id,
                titulo,
                descricao,
            );
            const response = ResponseModel(
                201,
                result,
                MessageModel.postSucess("notificacao")
            );
            res.status(201).send(response);
        }catch (error){
            const response = ResponseModel(404, null, MessageModel.postFail("notificacao"));
            res.status(404).send(response);
        }
    }

    async putNotificacao(req, res) {
        try{
            const { notificacao_id } = req.params;
            const { compromisso_id, titulo, descricao } = req.body;
            const result = await NotificacaoService.putNotificacao(
                notificacao_id,
                compromisso_id,
                titulo,
                descricao,
            );
            const response = ResponseModel(
                200,
                result,
                MessageModel.putSucess("notificacao")
            );
            res.status(200).send(response);
        }catch (error){
            const response = ResponseModel(404, null, MessageModel.putFail("notificacao"));
            res.status(404).send(response);
        }
    }

    async deleteNotificacao(req, res) {
        try{
            const { notificacao_id } = req.params;
            const result = await NotificacaoService.deleteNotificacao(
                notificacao_id
            );
            const response = ResponseModel(
                200,
                result,
                MessageModel.deleteSucess("notificacao")
            );
            res.status(200).send(response);
        } catch(error){
            const response = ResponseModel(404, null, MessageModel.deleteFail("notificacao"));
            res.status(404).send(response);
        }
    }
}

module.exports = new NotificacaoController();