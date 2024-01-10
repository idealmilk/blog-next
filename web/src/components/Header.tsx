import Link from "next/link";

import Button from "@/components/common/Button";

export default function Header() {
  return (
    <header className="z-10">
      <div className="justify-between border-b mb-4 font-mono text-4xl lg:flex">
        <Link
          href="/"
          className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto"
        >
          岡 黛の今日の一日
        </Link>

        <div className="flex flex-col items-center justify-center">
          <Link href="/admin">
            <Button>管理画面トップ</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
