

import { SmtpMessage } from "../../smtp-message";
import DoctorRegisterForm from "./DoctorRegisterForm";
import { FormMessage, type Message } from "@/components/form-message";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const message = await searchParams;

  return (
    <div className="w-[500px] bg-muted/30 flex flex-col">
      <DoctorRegisterForm message={message} />
      <div>
        <SmtpMessage />
      </div>
    </div>
  );
}