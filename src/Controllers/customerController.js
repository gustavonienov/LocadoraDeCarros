import * as Yup from "yup";
import Customer from "../Models/Customer.js";
import { Op } from "sequelize";


class customerController {


    async index(req, res) {
        let custs = await Customer.findAll();
        return res.json({ clientes: custs });
    }

    async show(req, res) {
        const schema = Yup.object().shape({
            cpf: Yup.string().required(),
        });
        if (!(await schema.isValid(req.query))) {
            return res.status(400).json({ error: "Dados incorretos." });
        }
        const { cpf } = req.query;
        let cust = await Customer.findOne({
            where: { cpf },
        });
        return res.json(cust);
    }


    async store(req, res) {
        const schema = Yup.object().shape({
            cpf: Yup.string().required().length(11),
            nome: Yup.string().required(),
            telefone: Yup.string().required().length(11),
            email: Yup.string().required().email(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Dados incorretos." });
        }
        const { cpf } = req.body;
        const { nome } = req.body;
        const { telefone } = req.body;
        const { email } = req.body;

        const clienteExistente = await Customer.findOne({
            where: {
                [Op.or]: [
                    { telefone },
                    { email },
                    { cpf },
                ]
            }
        }
        )

        if (clienteExistente) {
            const camposUnicos = ['telefone', 'email', 'cpf'];

            for (const campo of camposUnicos) {
                if (clienteExistente[campo] === req.body[campo]) {
                    return res.status(400).json({ error: `Já existe um cliente cadastrado com o ${campo} informado.` });
                }
            }
        }
        cust = await Customer.create({
            cpf,
            nome,
            telefone,
            email,
        });
        return res.json(cust);
    }

    async update(req, res) {
        const schemacpfAtual = Yup.object().shape({
            id: Yup.string().required(),
        });
        console.log('req.params:', req.params);
        if (!(await schemacpfAtual.isValid(req.params))) {
            return res.status(400).json({ error: "Dados incorretos." });
        }
        const schema = Yup.object().shape({
            cpf: Yup.string().required().length(11),
            nome: Yup.string().required(),
            telefone: Yup.string().required(),
            email: Yup.string().required().email(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Dados incorretos." });
        }
        const { id } = req.params;
        const { cpf } = req.body;
        const { nome } = req.body;
        const { telefone } = req.body;
        const { email } = req.body;
        const dados = {
            cpf,
            nome,
            telefone,
            email,
        };
        await Customer.update(dados, {
            where: { id },
        });
        return res.send();
    }

    async destroy(req, res) {
        const schemacpfAtual = Yup.object().shape({
            id: Yup.string().required(),
        });
        if (!(await schemacpfAtual.isValid(req.params))) {
            return res.status(400).json({ error: "Dados incorretos." });
        }
        const { id } = req.params;
        await Customer.destroy({
            where: { id },
        });
        return res.send();
    }
}

export default new customerController();