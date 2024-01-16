import Link from "next/link";

import Button from "./button";
import useUser from "@/hooks/useUser";
import { LogoutAPI } from "@/app/api/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const { mutate, loggedIn } = useUser();

  const handleLogOut = async () => {
    await LogoutAPI();
    mutate();
    router.replace("/");
  };

  console.log("loggedIn: ", loggedIn);

  return (
    <header className="z-10 ">
      <div className="fixed w-full left-0 top-0 justify-between border-b mb-4 backdrop-blur-2xl font-mono text-4xl flex">
        <Link
          href="/"
          className=" flex w-full justify-center pb-6 pt-8 text-2xl "
        >
          岡 黛の今日の一日
        </Link>

        <div className="flex flex gap-4 items-center justify-center w-full">
          {loggedIn && (
            <>
              <Link href="/admin">
                <Button>管理画面トップ</Button>
              </Link>

              <span onClick={handleLogOut}>
                <Button>Log Out</Button>
              </span>
            </>
          )}

          {!loggedIn && (
            <>
              <Link href="/signin">
                <Button>Sign In</Button>
              </Link>

              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
