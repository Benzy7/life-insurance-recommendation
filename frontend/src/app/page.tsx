import InsuranceForm from "@/components/form/InsuranceForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-6">
          Life Insurance Advisor
        </h1>
        <InsuranceForm />
      </div>
    </main>
  );
}
