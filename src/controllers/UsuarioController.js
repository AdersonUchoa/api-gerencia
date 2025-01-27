const ResponseModel = require("../models/ResponseModel");
const UsuarioService = require("../services/UsuarioService");
const MessageModel = require("../models/MessageModel");

class UsuarioController {
    async getUsuario(req, res) {
        try{
            const result = await UsuarioService.getUsuario();
            const response = ResponseModel(
                200,
                result,
                MessageModel.getSucess("usuario")
            );
            res.status(200).send(response);
        } catch (error){
            console.log(error);
            const response = ResponseModel(404, null, MessageModel.getFail("usuario"));
            res.status(404).send(response);
        }
    }

    async postUsuario(req, res) {
        try{
            const { nome, senha } = req.body;
            const result = await UsuarioService.postUsuario(
                nome,
                senha
            );
            const response = ResponseModel(
                201,
                result,
                MessageModel.postSucess("usuario")
            );
            res.status(201).send(response);
        }catch (error){
            const response = ResponseModel(404, null, MessageModel.postFail("usuario"));
            res.status(404).send(response);
        }
    }

    async putUsuario(req, res) {
        try{
            const { usuario_id } = req.params;
            const { nome, senha } = req.body;
            const result = await UsuarioService.putUsuario(
                usuario_id,
                nome,
                senha
            );
            const response = ResponseModel(
                200,
                result,
                MessageModel.putSucess("usuario")
            );
            res.status(200).send(response);
        }catch (error){
            const response = ResponseModel(404, null, MessageModel.putFail("usuario"));
            res.status(404).send(response);
        }
    }

    async deleteUsuario(req, res) {
        try{
            const { usuario_id } = req.params;
            const result = await UsuarioService.deleteUsuario(
                usuario_id
            );
            const response = ResponseModel(
                200,
                result,
                MessageModel.deleteSucess("usuario")
            );
            res.status(200).send(response);
        } catch(error){
            const response = ResponseModel(404, null, MessageModel.deleteFail("usuario"));
            res.status(404).send(response);
        }
    }
}

module.exports = UsuarioController;