// client/src/Schemas/ForgetPasswordSchema.js

import { z } from "zod";

export const ForgetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
