import { db } from "./prisma";
import { compareSync } from "bcrypt";

export type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  studentId?: string;
  password?: string;
};

export async function findUserByCredentials(
  email: string,
  password: string
): Promise<User | null> {
  const user = await db.user.findFirst({
    where: {
        email,
    },
    select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        password: true,
        studentId: true
    },
  });

  if (!user) {
    return null;
  }

  const passwordMatch = compareSync(password, user.password);

  if (passwordMatch) {
    return {
      ...user,
      name: user.name ?? '',
    };
  }

  return null;
}