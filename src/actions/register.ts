"use server";

import { db } from "@/lib/prisma";
import { hashSync } from "bcrypt";

export default async function registerAction(
  _prevState: any,
  formData: FormData
) {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    password: formData.get("password") as string,
    studentId: formData.get("studentId") as string,
  };

  if (!data.email || !data.password || !data.name || !data.phone) {
    return {
      success: false,
      message: "All fields are required",
    };
  }

  const userAllreadyExists = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (userAllreadyExists) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  await db.user.create({
    data: {
      email: data.email,
      password: hashSync(data.password, 10),
      name: data.name,
      phone: data.phone,
      studentId: data.studentId,
    },
  });

  return {
    success: true,
    message: "User created successfully",
  };
}