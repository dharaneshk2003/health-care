import type { Message } from "@/components/form-message";
import PatientLoginForm from "./PatientLoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const message = await searchParams;

  return (
    <div className="w-[500px] bg-muted/30 flex flex-col m-0">
      <PatientLoginForm message={message} />
    </div>
  );
}
