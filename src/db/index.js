import Sequelize from "sequelize";
import databaseConfig from "../db/database.js";
import Car from "../Models/Car.js";
import Customer from "../Models/Customer.js";
import Rent from "../Models/Rent.js";

const models = [Car, Customer, Rent];

class Database {
    constructor() {
        this.init();
    }
    init() {
        // Faz a conexão com o BD
        this.connection = new Sequelize(databaseConfig);
        // Carrega os models e associaçoes com map
        models
            .map((model) => model.init(this.connection))
            .map(
                (model) => model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();