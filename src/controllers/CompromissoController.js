const ResponseModel = require("../models/ResponseModel");
const CompromissoService = require("../services/CompromissoService");
const MessageModel = require("../models/MessageModel");

class CompromissoController {
    async getCompromisso(req, res) {
        try{
            const { usuario_id } = req.userData;
            const result = await CompromissoService.getCompromisso(usuario_id);
            const response = ResponseModel(
                200,
                result,
                MessageModel.getSucess("compromisso")
            );
            res.status(200).send(response);
        } catch (error){
            console.log(error);
            const response = ResponseModel(404, null, MessageModel.getFail("compromisso"));
            res.status(404).send(response);
        }
    }

    async postCompromisso(req, res) {
        try{
            const { usuario_id } = req.userData;
            const { titulo, descricao, dataCompromisso, horario, classificacao } = req.body;
            const result = await CompromissoService.postCompromisso(
                usuario_id,
                titulo,
                descricao,
                dataCompromisso,
                horario,
                classificacao,
            );
            const response = ResponseModel(
                201,
                result,
                MessageModel.postSucess("compromisso")
            );
            res.status(201).send(response);
        }catch (error){
            console.log(error);
            const response = ResponseModel(404, null, MessageModel.postFail("compromisso"));
            res.status(404).send(response);
        }
    }

    async putCompromisso(req, res) {
        try{
            const { compromisso_id } = req.params;
            const { usuario_id } = req.userData;
            const { titulo, descricao, dataCompromisso, horario } = req.body;
            const result = await CompromissoService.putCompromisso(
                compromisso_id,
                usuario_id,
                titulo,
                descricao,
                dataCompromisso,
                horario
            );
            const response = ResponseModel(
                200,
                result,
                MessageModel.putSucess("compromisso")
            );
            res.status(200).send(response);
        }catch (error){
            console.log(error);
            const response = ResponseModel(404, null, MessageModel.putFail("compromisso"));
            res.status(404).send(response);
        }
    }

    async deleteCompromisso(req, res) {
        try{
            const { compromisso_id } = req.params;
            const result = await CompromissoService.deleteCompromisso(
                compromisso_id
            );
            const response = ResponseModel(
                200,
                result,
                MessageModel.deleteSucess("compromisso")
            );
            res.status(200).send(response);
        } catch(error){
            const response = ResponseModel(404, null, MessageModel.deleteFail("compromisso"));
            res.status(404).send(response);
        }
    }
}

module.exports = new CompromissoController();