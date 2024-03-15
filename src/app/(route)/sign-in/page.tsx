import ImageLoad from "@/app/ui/image-load";
import AuthForm from "@/app/ui/auth-form";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Generated by create next app",
};

export default function Login() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-start md:items-center md:min-h-[60vh]">
      <div>
        <div className="mb-5">
          <h3 className="text-lime-950 font-bold text-5xl">Selamat datang!</h3>
          <p className="text-sm font-semibold text-gray-400 mt-2">
            Masukan kredensial akun anda untuk melanjutkan
          </p>
        </div>
        <AuthForm />
      </div>

      <div className="hidden md:flex">
        <ImageLoad
          className="h-96 w-full"
          src="/images/login-img.png"
          alt="login-img"
        />
      </div>
    </div>
  );
}
