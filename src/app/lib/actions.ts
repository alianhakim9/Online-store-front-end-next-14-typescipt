import { signIn } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function login(prevState: string | undefined, formData: FormData) {
  const { email, password } = LoginSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then((v) => {
      if (v?.status === 200) {
        revalidatePath("/");
        redirect("/");
      } else if (v?.status === 401) {
        return {
          message: "Gagal masuk",
          desc: "Silahkan periksa kembali email atau kata sanda anda",
        };
      }
    });
  } catch (error) {
    return "invalid credentials";
  }
}
