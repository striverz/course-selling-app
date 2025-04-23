const { z } = require("zod");

const validatingUserInfo = (userInfo) => {
  const requireBody = z.object({
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
    emailId: z.string().min(5).max(30).email(),
    password: z.string().min(5).max(50),
  });

  const parsedDataWithSuccess = requireBody.safeParse(userInfo);
  if (parsedDataWithSuccess.success) {
    return true;
  } else {
    throw new Error(parsedDataWithSuccess?.error?.errors[0]?.message);
  }
};

module.exports = {
  validatingUserInfo,
};
