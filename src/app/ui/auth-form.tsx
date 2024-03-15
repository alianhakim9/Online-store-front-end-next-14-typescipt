"use client";

import { API_URL } from "@/app/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { showSonnerToast } from "@/app/lib/utils";
import LoadingButton from "@/app/ui/loading-button";
import OAuthButton from "@/app/ui/oauth-button";
import { PasswordInput } from "@/app/ui/password-input";
interface IAuthFormProps {
  isSignUp?: boolean;
  signUpUrl?: string;
  fromAdmin?: boolean;
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signUpSchema = z
  .object({
    firstname: z.string().min(2).max(100),
    lastname: z.string().min(2).max(100),
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must be the same",
    path: ["confirmPassword"],
  });

const AuthForm = ({ isSignUp, signUpUrl, fromAdmin }: IAuthFormProps) => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(isSignUp ? signUpSchema : loginSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    if (isSignUp) {
      await axios
        .post(`${API_URL}/auth/local/register`, {
          firstname: values.firstname,
          lastname: values.lastname,
          username: values.username,
          email: values.email,
          password: values.password,
        })
        .then(() => {
          showSonnerToast(
            "Akun berhasil dibuat",
            "Silahkan masuk untuk melanjutkan"
          );
          router.push("/sign-in");
        })
        .catch((error: AxiosError) => {
          console.log(error.response);
          showSonnerToast("Terjadi kesalahan", error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (!isSignUp) {
      const email = values.email;
      const password = values.password;
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
        .then((v) => {
          if (v?.status === 200) {
            router.refresh();
          } else if (v?.status === 401) {
            showSonnerToast(
              "Gagal masuk",
              "Silahkan periksa kembali email atau kata sandi anda"
            );
          }
        })
        .finally(() => setIsLoading(false));
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full md:w-1/2"
      >
        {isSignUp && (
          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama depan*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama belakang*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        {isSignUp && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kata sandi*</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSignUp && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi kata sandi*</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex flex-col">
          <LoadingButton
            type="submit"
            title={isSignUp ? "Daftar" : "Masuk"}
            isLoading={isLoading}
            className="mt-4"
          />
          {!isSignUp && fromAdmin && (
            <Button
              type="button"
              className="mt-5 self-stretc rounded-lg shadow-lg"
              variant="outline"
              onClick={() => {
                if (signUpUrl) router.push(signUpUrl);
              }}
              disabled={isLoading}
            >
              Buat akun
            </Button>
          )}
        </div>
        {!fromAdmin && (
          <div className="mt-4 flex flex-col gap-2">
            <hr />
            <p className="text-center"></p>
            <OAuthButton
              onClick={() => signIn("google")}
              title={isSignUp ? "Sign Up" : "Login"}
            />
          </div>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
