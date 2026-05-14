"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { loginSchema, registerSchema } from "@/lib/validations";
import { createSession, destroySession } from "./session";

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    redirect("/login?error=validation");
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() }
  });

  const valid = user
    ? await bcrypt.compare(parsed.data.password, user.passwordHash)
    : false;

  if (!valid || !user) {
    redirect("/login?error=credentials");
  }

  await createSession({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });

  redirect("/dashboard");
}

export async function registerAction(formData: FormData) {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    redirect("/register?error=validation");
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() }
  });

  if (existing) {
    redirect("/register?error=exists");
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      passwordHash,
      role: parsed.data.role
    }
  });

  await createSession({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}
