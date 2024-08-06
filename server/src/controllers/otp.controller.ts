import otpGenerator from "otp-generator";
import OTPModel from "../models/otp.model";
import { Request, Response } from "express";

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log(req.body)
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTPModel.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTPModel.findOne({ otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTPModel.create(otpPayload);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
