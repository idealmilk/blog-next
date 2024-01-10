import Link from "next/link";

import Button from "@/components/common/Button";

export default function Header() {
  return (
    <header className="z-10 ">
      <div className="fixed w-full left-0 top-0 justify-between border-b mb-4 backdrop-blur-2xl font-mono text-4xl flex">
        <Link
          href="/"
          className=" flex w-full justify-center pb-6 pt-8 text-2xl "
        >
          岡 黛の今日の一日
        </Link>

        <div className="flex flex-col items-center justify-center w-full">
          <Link href="/admin">
            <Button>管理画面トップ</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
