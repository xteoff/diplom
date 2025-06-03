import CartList from "./components/cart-list";

export default async function CartPage() {
  return (
    <div className="min-h-screen flex flex-col justify-start py-10 items-center gap-5">
      <CartList />
    </div>
  );
}
