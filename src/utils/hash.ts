import bcrypt from "bcrypt";
export const hash = async (val: string) => bcrypt.hash(val, 10);
