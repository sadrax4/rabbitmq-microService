const { createOrderWithQueue } = require("./config /rabbit.config");
require("./model/initMongo");
createOrderWithQueue("ORDER");
