const databaseConfig = {
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "",
    database: "locadora",
    define: {
        timestamps: true,
        underscored: false,
        underscoredAll: false,
        freezeTableName: true,
    },
};

export default databaseConfig;
