// app/login/page.tsx
import type { Message } from "@/components/form-message";
import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const message = await searchParams;

  return (
    <div className="w-[500px] bg-muted/30 flex flex-col">
      <LoginForm message={message} />
    </div>
  );
}
