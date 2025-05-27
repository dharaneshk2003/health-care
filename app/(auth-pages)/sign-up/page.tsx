// app/(auth-pages)/sign-up/page.tsx

import { signUpAction } from "@/app/actions";
import { SmtpMessage } from "../smtp-message";
import RegisterForm from "./RegisterForm.tsx";
import { FormMessage, type Message } from "@/components/form-message";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const message = await searchParams;

  return (
    <div className="w-[500px] bg-muted/30 flex flex-col">
      <RegisterForm message={message} />
      <div className="">
        <SmtpMessage />
      </div>
    </div>
  );
}