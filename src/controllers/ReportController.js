const ReportService = require("../services/ReportService");

class ReportController {
    async getReport(req, res) {
        try {
            const { usuario_id } = req.userData
            const {dtInicio, dtFim} = req.query
            const relatorio = await ReportService.getReport(dtInicio, dtFim, usuario_id)
            const response = ResponseModel(
                201,
                relatorio,
                MessageModel.postSucess("tarefa")
            );
            res.status(201).send(response);
        } catch (error) {
            console.log(error);
            const response = ResponseModel(404, null, MessageModel.getFail("relatorio"));
            res.status(404).send(response);
        }
    }
}

module.exports = new ReportController()