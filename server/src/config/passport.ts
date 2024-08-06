import passport from 'passport';
import UserModel from '../models/user.model';
import { randomBytes } from 'crypto';
import hashPassword from '../utils/hash.password';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { Strategy as OAuth2Strategy } from 'passport-google-oauth2';
import RoleModel from '../models/role.model';
import UserAndRoleModel from '../models/user.role.model';

interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

const cookieExtractor = (req: any): string | null => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

const jwtOptions: StrategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.SECRET_KEY as string,
};

passport.use(
    'token',
    new JwtStrategy(jwtOptions, async (payload: JwtPayload, done) => {
        try {
            const user = await UserModel.findById(payload.userId);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

passport.use(
    new OAuth2Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: '/v1/api/google/callback',
        scope: ['email', 'profile'],
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
            let user = await UserModel.findOne({ email: profile.email });

            if (!user) {
                const randomPassword = randomBytes(8).toString('hex');
                const hashedPassword = await hashPassword(randomPassword);

                user = new UserModel({
                    googleId: profile.id,
                    firstName: profile.family_name,
                    lastName: profile.given_name,
                    email: profile.emails[0].value,
                    password: hashedPassword,
                });
                await user.save();

                const role = new RoleModel({
                    roleName: 'User',
                    roleDescription: 'New role'
                });
                
                await role.save();

                const roleAndUser = new UserAndRoleModel({
                    userId: user._id,
                    roleId: role._id,
                });

                await roleAndUser.save();
            }

            const roleAndUser = await UserAndRoleModel.findOne({ userId: user._id });
            const roleName = await RoleModel.findById(roleAndUser?.roleId);

            const payload: JwtPayload = { 
                userId: user._id, 
                email: user.email, 
                role: roleName?.roleName || 'User' 
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '1h' });

            return done(null, { token });
        } catch (error) {
            return done(error, null);
        }
    })
);

passport.serializeUser((user: any, done) => {
    done(null, user.token);
});

passport.deserializeUser((token: string, done) => {
    jwt.verify(token, process.env.SECRET_KEY as string, async (err, payload) => {
        if (err) return done(err, null);

        if (payload && typeof payload !== 'string') {
            try {
                const user = await UserModel.findById((payload as JwtPayload).userId);
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error) {
                done(error, false);
            }
        } else {
            done(null, false);
        }
    });
});