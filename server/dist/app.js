"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const routes_1 = require("./routes/routes");
const error_middleware_1 = require("./middlewares/error.middleware");
dotenv_1.default.config();
(0, database_1.default)();
require("./config/passport");
const role_routes_1 = __importDefault(require("./routes/role.routes"));
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT, 10) || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('tiny'));
app.use((0, cookie_session_1.default)({
    name: 'google-auth-session',
    keys: [process.env.COOKIE_KEY]
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/v1/api', routes_1.authRoutes);
app.use('/v1/api', routes_1.otpRoutes);
app.use('/v1/api', role_routes_1.default);
app.use('/v1/api', routes_1.userRoutes);
app.use('/v1/api', routes_1.userAndRoleRoutes);
app.use('/v1/api', routes_1.groupNameRoutes);
app.use('/v1/api', routes_1.groupAndRoleRoutes);
app.use('/v1/api', routes_1.formNameRoutes);
app.use('/v1/api', routes_1.formAndRoleRoutes);
// Route not found handler
app.use((req, res, next) => {
    const error = new error_middleware_1.AppError('Not Found', 404);
    next(error);
});
// Global error handling middleware
app.use(error_middleware_1.errorHandler);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next(err);
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=app.js.map