const ResponseModel = require("../models/ResponseModel");
const MessageModel = require("../models/MessageModel");
const ClassificacaoService = require("../services/ClassificacaoService");

class ClassificacaoController {
    async getClassificacao(req, res) {
        try{
            const result = await ClassificacaoService.getClassificacao();
            const response = ResponseModel(
                200,
                result,
                MessageModel.getSucess("classificação")
            );
            res.status(200).send(response);
        } catch (error){
            console.log(error);
            const response = ResponseModel(404, null, MessageModel.getFail("classificação"));
            res.status(404).send(response);
        }
    }

    async postClassificacao(req, res) {
        try{
            const { usuario_id, titulo } = req.body;
            const result = await ClassificacaoService.postClassificacao(
                usuario_id,
                titulo
            );
            const response = ResponseModel(
                201,
                result,
                MessageModel.postSucess("classificacao")
            );
            res.status(201).send(response);
        }catch (error){
            const response = ResponseModel(404, null, MessageModel.postFail("classificacao"));
            res.status(404).send(response);
        }
    }

    async putClassificacao(req, res) {
        try{
            const { classificacao_id } = req.params;
            const { usuario_id, titulo } = req.body;
            const result = await ClassificacaoService.putClassificacao(
                classificacao_id,
                usuario_id,
                titulo
            );
            const response = ResponseModel(
                200,
                result,
                MessageModel.putSucess("classificacao")
            );
            res.status(200).send(response);
        }catch (error){
            const response = ResponseModel(404, null, MessageModel.putFail("classificacao"));
            res.status(404).send(response);
        }
    }

    async deleteClassificacao(req, res) {
        try{
            const { classificacao_id } = req.params;
            const result = await ClassificacaoService.deleteClassificacao(
                classificacao_id
            );
            const response = ResponseModel(
                200,
                result,
                MessageModel.deleteSucess("classificacao")
            );
            res.status(200).send(response);
        } catch(error){
            const response = ResponseModel(404, null, MessageModel.deleteFail("classificacao"));
            res.status(404).send(response);
        }
    }
}

module.exports = new ClassificacaoController();