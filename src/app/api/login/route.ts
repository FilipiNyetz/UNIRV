import { NextResponse } from 'next/server';
import { signIn } from "../../../../auth";
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (isRedirectError(e)) {
      throw e;
    }
    
    if (e.type === "CredentialsSignin") {
      return NextResponse.json(
        { success: false, error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Ops, ocorreu algum erro inesperado!" },
      { status: 500 }
    );
  }
}