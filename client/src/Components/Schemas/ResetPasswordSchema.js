// client/src/Schemas/ResetPasswordSchema.js

import { z } from "zod";

export const ResetPasswordSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be at least 6 characters long" }),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
