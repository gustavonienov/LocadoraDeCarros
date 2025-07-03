import * as Yup from "yup";
import Car from "../Models/Car.js";

class CarController {

    async index(req, res) {
        let cars = await Car.findAll();
        return res.json({carros: cars});
    }

    async show(req, res) {
        const schema = Yup.object().shape({
            placa: Yup.string().required().length(7),
        });
        if (!(await schema.isValid(req.query))) {
            return res.status(400).json({ error: "Schema is not valid." });
        }
        const { placa } = req.query;
        let car = await Car.findAll({
            where: { placa },
        });
        return res.json(car);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            placa: Yup.string().required().length(7),
            marca: Yup.string().required(),
            modelo: Yup.string().required(),
            ano: Yup.number().required().positive(),
            disponivel: Yup.boolean().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Schema is not valid." });
        }
        const { placa } = req.body;
        const { marca } = req.body;
        const { modelo } = req.body;
        const { ano } = req.body;
        const { disponivel } = req.body;
        let car = await Car.findAll({
            where: { placa },
        });
        if (!car || car.length == 0) {
            car = await Car.create({
                placa,
                marca,
                modelo,
                ano,
                disponivel,
            });
        }
        return res.json(car);
    }

    async update(req, res) {
        const schemaPlacaAtual = Yup.object().shape({
            placa: Yup.string().required().length(7),
        });
        console.log('req.params:', req.params);
        if (!(await schemaPlacaAtual.isValid(req.params))) {
            return res.status(400).json({ error: "Schema is not valid." });
        }
        const schema = Yup.object().shape({
            placa: Yup.string().required().length(7),
            marca: Yup.string().required(),
            modelo: Yup.string().required(),
            ano: Yup.number().required().positive(),
            disponivel: Yup.boolean().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Schema is not valid." });
        }
        const { placa : pa } = req.params;
        const { placa } = req.body;
        const { marca } = req.body;
        const { modelo } = req.body;
        const { ano } = req.body;
        const { disponivel } = req.body;
        const dados = {
            placa,
            marca,
            modelo,
            ano,
            disponivel,
        };
        await Car.update(dados, {
            where: { placa: pa },
        });
        return res.send();
    }

    async destroy(req, res) {
        const schemaPlacaAtual = Yup.object().shape({
            placa: Yup.string().required().length(7),
        });
        if (!(await schemaPlacaAtual.isValid(req.params))) {
            return res.status(400).json({ error: "Schema is not valid." });
        }
        const { placa } = req.params;
        await Car.destroy({
            where: { placa },
        });
        return res.send();
    }
}

export default new CarController();