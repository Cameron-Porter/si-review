import { Cart } from "@models/cart";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  // QUESTION: Why might we prefer unknown here instead of any?
  // ANSWER: By using 'unknown' it forces us to check the type before using. 'Any' is generally avoided.
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;
  const now = Date.now();

  res.status(200).json({
    // QUESTION: What does the '...' operator do?
    // ANSWER: It spreads an array/object into separate arguments.
    ...cart,
    // QUESTION: What does the '??' operator do?
    //           What values of cart.products would cause '[]` to be used for the concat call?
    // ANSWER: The '??' operator returns the right side value if the left side is null or undefined. So it would return [] if the values were such.
    products: (cart.products ?? []).concat({
      id: "123",
      name: `Product ${(Date.now() / 1000).toFixed(0)}`,
      price: now % 2 === 0 ? 56 : 65,
    }),
  } as Cart);
}
