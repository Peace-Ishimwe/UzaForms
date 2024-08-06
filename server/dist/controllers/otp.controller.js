"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const otp_model_1 = __importDefault(require("../models/otp.model"));
const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(req.body);
        let otp = otp_generator_1.default.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        let result = await otp_model_1.default.findOne({ otp });
        while (result) {
            otp = otp_generator_1.default.generate(6, {
                upperCaseAlphabets: false,
            });
            result = await otp_model_1.default.findOne({ otp });
        }
        const otpPayload = { email, otp };
        const otpBody = await otp_model_1.default.create(otpPayload);
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};
exports.sendOTP = sendOTP;
//# sourceMappingURL=otp.controller.js.map