import { getOrderCabinet } from "./actions";
import OrdersList from "./components/order-list";

export default function UserPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-accent-950 pb-5">
      <OrdersList />
    </main>
  );
}
