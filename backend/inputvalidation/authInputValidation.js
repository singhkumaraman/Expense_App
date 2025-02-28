const z = require("zod");
const signupInputsValidate = (userData) => {
  const userSchema = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name cannot exceed 50 characters"),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password cannot exceed 20 characters"),
  });
  const result = userSchema.safeParse(userData);
  return result.success;
};
const loginInputsValidate = (userData) => {
  const userSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password cannot exceed 20 characters"),
  });
  const result = userSchema.safeParse(userData);
  return result.success;
};
module.exports = { signupInputsValidate, loginInputsValidate };
