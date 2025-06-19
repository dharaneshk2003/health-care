
import { SmtpMessage } from "../../smtp-message";
import PatientRegisterForm from "./PatientRegisterForm";
import { FormMessage, type Message } from "@/components/form-message";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const message = await searchParams;

  return (
    <div className="w-[500px] bg-muted/30 flex flex-col">
      <PatientRegisterForm message={message} />
        <SmtpMessage />
    </div>
  );
}