"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formAndRoleRoutes = exports.formNameRoutes = exports.groupAndRoleRoutes = exports.groupNameRoutes = exports.userAndRoleRoutes = exports.userRoutes = exports.otpRoutes = exports.authRoutes = void 0;
const auth_routes_1 = __importDefault(require("./auth.routes"));
exports.authRoutes = auth_routes_1.default;
const otp_routes_1 = __importDefault(require("./otp.routes"));
exports.otpRoutes = otp_routes_1.default;
const user_routes_1 = __importDefault(require("./user/user.routes"));
exports.userRoutes = user_routes_1.default;
const user_role_routes_1 = __importDefault(require("./user/user.role.routes"));
exports.userAndRoleRoutes = user_role_routes_1.default;
const group_names_routes_1 = __importDefault(require("./group/group.names.routes"));
exports.groupNameRoutes = group_names_routes_1.default;
const group_role_routes_1 = __importDefault(require("./group/group.role.routes"));
exports.groupAndRoleRoutes = group_role_routes_1.default;
const form_name_routes_1 = __importDefault(require("./form/form.name.routes"));
exports.formNameRoutes = form_name_routes_1.default;
const form_role_routes_1 = __importDefault(require("./form/form.role.routes"));
exports.formAndRoleRoutes = form_role_routes_1.default;
//# sourceMappingURL=routes.js.map