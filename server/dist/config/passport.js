"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_model_1 = __importDefault(require("../models/user/user.model"));
const crypto_1 = require("crypto");
const hash_password_1 = __importDefault(require("../utils/hash.password"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_jwt_1 = require("passport-jwt");
const passport_google_oauth2_1 = require("passport-google-oauth2");
const role_model_1 = __importDefault(require("../models/role.model"));
const user_role_model_1 = __importDefault(require("../models/user/user.role.model"));
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};
const jwtOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.SECRET_KEY,
};
passport_1.default.use('token', new passport_jwt_1.Strategy(jwtOptions, async (payload, done) => {
    try {
        const user = await user_model_1.default.findById(payload.userId);
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (error) {
        return done(error, false);
    }
}));
passport_1.default.use(new passport_google_oauth2_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/v1/api/google/callback',
    scope: ['email', 'profile'],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await user_model_1.default.findOne({ email: profile.email });
        if (!user) {
            const randomPassword = (0, crypto_1.randomBytes)(8).toString('hex');
            const hashedPassword = await (0, hash_password_1.default)(randomPassword);
            user = new user_model_1.default({
                googleId: profile.id,
                firstName: profile.family_name,
                lastName: profile.given_name,
                email: profile.emails[0].value,
                password: hashedPassword,
            });
            await user.save();
            const role = await role_model_1.default.findOne({ roleName: "User" }, { _id: 1 });
            if (role) {
                const roleAndUser = new user_role_model_1.default({
                    userId: user._id,
                    roleId: role._id,
                });
                await roleAndUser.save();
            }
            else {
                const role = new role_model_1.default({
                    roleName: 'User',
                    roleDescription: 'New role'
                });
                await role.save();
            }
        }
        const roleAndUser = await user_role_model_1.default.findOne({ userId: user._id });
        const roleName = await role_model_1.default.findById(roleAndUser?.roleId);
        const payload = {
            userId: user._id,
            email: user.email,
            role: roleName?.roleName || 'User'
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
        return done(null, { token });
    }
    catch (error) {
        return done(error, null);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.token);
});
passport_1.default.deserializeUser((token, done) => {
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, async (err, payload) => {
        if (err)
            return done(err, null);
        if (payload && typeof payload !== 'string') {
            try {
                const user = await user_model_1.default.findById(payload.userId);
                if (user) {
                    done(null, user);
                }
                else {
                    done(null, false);
                }
            }
            catch (error) {
                done(error, false);
            }
        }
        else {
            done(null, false);
        }
    });
});
//# sourceMappingURL=passport.js.map