"use client";

import { useState, useEffect, FormEvent, useCallback } from "react";
import { useRouter } from "next/navigation";

import { SignInAPI } from "../api/user";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import AuthForm from "@/components/auth-form";
import { TUser } from "@/types/User";

const SignIn = () => {
  const router = useRouter();

  const { mutate, loggedIn } = useUser();

  useEffect(() => {
    if (loggedIn) router.replace("/");
  }, [loggedIn]);

  const onSignInSubmit = useCallback(
    async (data: TUser) => {
      try {
        await SignInAPI(data);
        mutate();
        router.replace(`/`);
      } catch (error) {
        console.error("Failed to sign in", error);
      }
    },
    [router]
  );

  if (loggedIn) return <> Redirecting.... </>;

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <AuthForm postAction={onSignInSubmit} />
      </div>
    </div>
  );
};

export default SignIn;
