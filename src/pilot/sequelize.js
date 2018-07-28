const Sequelize = require('sequelize');
const BranchModel = require('./entities/branch');
const StoreModel = require('./entities/store');
const ProductModel = require('./entities/product')
const ProductStoreModel = require('./entities/product_store');
const StockModel = require('./entities/stock');
const SupplierModel = require('./entities/supplier');
const UserModel = require('./entities/user');
const ItemModel = require('./entities/item');

const sequelize = new Sequelize('boomstore', 'boomstore', '5vTK7X1EOd0vTnqD', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Branch = BranchModel(sequelize, Sequelize);
const Store = StoreModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const ProductStore = ProductStoreModel(sequelize, Sequelize);
const Stock = StockModel(sequelize, Sequelize);
const Supplier = SupplierModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Item = ItemModel(sequelize, Sequelize);

Store.belongsTo(Branch);
Product.hasMany(ProductStore);
Store.hasMany(ProductStore);
Stock.belongsTo(Store);
Stock.belongsTo(Supplier);
Stock.belongsTo(User);

Item.belongsTo(Product);
Item.belongsTo(ProductStore);
Supplier.hasMany(Stock);

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  });

module.exports = {
  Branch,
  Store,
  ProductStore,
  Product,
  Supplier,
  Stock
}