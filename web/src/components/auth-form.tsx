import Link from "next/link";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TPost } from "@/types/Post";

type AuthFormProps = {
  isRegister?: boolean;
  postAction: Function;
};

export default function AuthForm({ isRegister, postAction }: AuthFormProps) {
  const validationSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z.string().min(1, { message: "Password is required" }),
    name: z.string().min(1, { message: "Name is required" }).optional(),
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => postAction(data);

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {isRegister ? "Create an account" : "Sign in to your account"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="z-10 text-md">
        {isRegister && (
          <div className="pb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your name
            </label>
            <input
              className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                errors.name && "border-red-500"
              } rounded appearance-none focus:outline-none focus:shadow-outline`}
              id="firstName"
              type="text"
              placeholder="タイトルを入力してください"
              {...register("name")}
            />
          </div>
        )}

        <div className="pb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="text"
            {...register("email")}
            className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              errors.email && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              errors.password && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {isRegister ? "Register" : "Sign In"}
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          {isRegister
            ? "Already have an account yet?"
            : "Don't have an account yet?"}
          <Link
            href={isRegister ? "/signin" : "/register"}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            {isRegister ? "Sign In" : "Register"}
          </Link>
        </p>
      </form>
    </div>
  );
}
