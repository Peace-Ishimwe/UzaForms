"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set(`strictQuery`, true);
const connectDB = async () => {
    try {
        const con = await mongoose_1.default.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Mongodb connected ${con.connection.host}`);
        mongoose_1.default.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });
        mongoose_1.default.connection.on('error', (err) => {
            console.log('Mongoose connection error:', err);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('Mongoose disconnected from MongoDB');
        });
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.default = connectDB;
//# sourceMappingURL=database.js.map