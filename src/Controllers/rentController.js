import * as Yup from "yup";
import Rent from "../Models/Rent.js";
import Customer from "../Models/Customer.js";
import Car from "../Models/Car.js";

class rentController {

    async index(req, res) {
        let rents = await Rent.findAll({
            attributes: ['id','valor', 'dataInicio', 'dataFim'],
            include: [
                {
                    model: Customer,
                    as: 'customer',
                    attributes: ['cpf'],
                },
                {
                    model: Car,
                    as: 'car',
                    attributes: ['placa'],
                }]
        });
        return res.json(rents);
    }

    async show(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number().required(),
        });
        if (!(await schema.isValid(req.query))) {
            return res.status(400).json({ error: "Schema is not valid." });
        }
        const { id } = req.query;
        let rent = await Rent.findAll({
            attributes: ['valor', 'dataInicio', 'dataFim'],
            where: { id },
            include: [
                {
                    model: Customer,
                    as: 'customer',
                    attributes: ['cpf'],
                },
                {
                    model: Car,
                    as: 'car',
                    attributes: ['placa'],
                }]
        });
        return res.json(rent);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            customerId: Yup.number().required(),
            carId: Yup.number().required(),
            valor: Yup.number().required().positive(),
            dataInicio: Yup.date().required(),
            dataFim: Yup.date(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Schema is not valid." });
        }
        const { customerId } = req.body;
        const { carId } = req.body;
        const { valor } = req.body;
        const { dataInicio } = req.body;
        const { dataFim } = req.body;
        let rent = await Rent.findAll({
            attributes: ['valor', 'dataInicio', 'dataFim'],
            where: { carId },
            include: [
                {
                    model: Customer,
                    as: 'customer',
                    attributes: ['cpf'],
                },
                {
                    model: Car,
                    as: 'car',
                    attributes: ['placa'],
                }]
        });
        if (!rent || Rent.length == 0) {
            rent = await Rent.create({
                customerId,
                carId,
                valor,
                dataInicio,
                dataFim,
            });
        }

        Car.update({ disponivel: false }, { where: { id: carId } });

        return res.json(rent);
    }

    async update(req, res) {
        const schemaidAtual = Yup.object().shape({
            id: Yup.number().required(),
        });
        console.log('req.params:', req.params);
        if (!(await schemaidAtual.isValid(req.params))) {
            return res.status(400).json({ error: "Schema is not valid." });
        }
        const schema = Yup.object().shape({
            id: Yup.number().required(),
            customerId: Yup.number().required(),
            carId: Yup.number().required(),
            valor: Yup.number().required(),
            dataInicio: Yup.date().required(),
            dataFim: Yup.date().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Schema is not valid." });
        }
        const { id: key } = req.params;
        const { customerId } = req.body;
        const { carId } = req.body;
        const { valor } = req.body;
        const { dataInicio } = req.body;
        const { dataFim } = req.body;
        const dados = {
            customerId,
            carId,
            valor,
            dataInicio,
            dataFim,
        };
        await Rent.update(dados, {
            where: { id: key },
        });
        return res.send();
    }

    async destroy(req, res) {
        const schemaidAtual = Yup.object().shape({
            id: Yup.number().required(),
        });
        if (!(await schemaidAtual.isValid(req.params))) {
            return res.status(400).json({ error: "Schema is not valid." });
        }
        const { id } = req.params;

        const rent = await Rent.findByPk(id);
        
        const { carId } = rent;
        
        await rent.destroy();

        Car.update({ disponivel: true }, { where: { id: carId } });

        return res.send();
    }
}

export default new rentController();