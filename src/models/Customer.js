import Sequelize, { Model } from "sequelize";

class Customer extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                cpf: Sequelize.STRING,
                telefone: Sequelize.INTEGER,
                email: Sequelize.STRING,
            },
            {
                sequelize,
                modelName: 'Customer',
                tableName: 'customer',
            }
        );
        return this;
    };
};

export default Customer;