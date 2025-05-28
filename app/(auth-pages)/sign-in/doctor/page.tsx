// app/login/page.tsx
import type { Message } from "@/components/form-message";
import DoctorLoginForm from "./DoctorLoginForm.tsx";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const message = await searchParams;

  return (
    <div className="w-[500px] bg-muted/30 flex flex-col mt-12">
      <DoctorLoginForm message={message} />
    </div>
  );
}
