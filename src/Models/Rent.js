import Sequelize, { Model } from "sequelize";

class Rent extends Model {
    static init(sequelize) {
        super.init(
            {
                valor: Sequelize.DOUBLE,
                dataInicio: Sequelize.DATE,
                dataFim: Sequelize.DATE,
            },
            {
                sequelize,
                modelName: 'Rent',
                tableName: 'rent',
            }
        );
        return this;
    };

    static associate(models) {
        this.belongsTo(models.Customer, { foreignKey: "customerId", as: "customer" });
        this.belongsTo(models.Car, { foreignKey: "carId", as: "car" });
    }
};

export default Rent;