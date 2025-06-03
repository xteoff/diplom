import { signIn } from "next-auth/react";

export async function signInAction(formData: FormData) {
 
  const result = await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirect: false,
  });
}
