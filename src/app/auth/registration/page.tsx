import RegistrationForm from "./components/registration-form";

export default async function RegistrationPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-red-50">
      <RegistrationForm/>
    </main>
  );
}
