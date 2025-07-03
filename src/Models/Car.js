import Sequelize, { Model } from "sequelize";

class Car extends Model {
    static init(sequelize) {
        super.init(
            {
                placa: Sequelize.STRING,
                marca: Sequelize.STRING,
                modelo: Sequelize.STRING,
                ano: Sequelize.INTEGER,
                disponivel: Sequelize.BOOLEAN,
            },
            {
                sequelize,
                modelName: 'Car',
                tableName: 'car',
            }
        );
        return this;
    };
};

export default Car;