import OrdersList from "./components/order-list";

export default function UserPage() {
  return (
    <main className="min-h-screen flex flex-col bg-accent-50 pb-5">
      <OrdersList />
    </main>
  );
}
