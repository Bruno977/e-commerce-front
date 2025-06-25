"use server";
import { cookies } from "next/headers";
import { api } from "../../../config/api";
import { FormState, SessionFormSchema } from "../definitions";
import { encrypt } from "../../../../../lib/actions/encrypt";
import { redirect } from "next/navigation";

export async function createSession(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SessionFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const response = await api.post("/sessions", {
      email,
      password,
    });
    const { access_token } = response.data;
    const session = await encrypt({ access_token, expiresAt });
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
  } catch (error: any) {
    if (error.response?.data?.statusCode === 401) {
      return {
        errors: {
          email: [""],
          password: [""],
          general: ["Email ou senha inválidos"],
        },
      };
    }
    return {
      errors: {
        general: ["Erro ao criar sessão, tente novamente mais tarde"],
      },
    };
  }
  redirect("/admin/dashboard");
}
