import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentTotalQuantity } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdatePizzaQuantity from "../cart/UpdatePizzaQuantity";

export default function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentTotalQuantity(id));

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {!soldOut &&
            (currentQuantity > 0 ? (
              <div className="flex items-center gap-3 sm:gap-8">
                <UpdatePizzaQuantity pizzaId={id} currentQuantity={currentQuantity} />

              <DeleteItem pizzaId={id}>Delete</DeleteItem>
              </div>
            ) : (
              <Button type="small" onClick={handleAddToCart}>
                Add To Cart
              </Button>
            ))}
        </div>
      </div>
    </li>
  );
}
