import { Cart } from "@models/cart";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;
  const productId = req.query.id;

  if (!productId) {
    res.status(400).json({ error: "Product ID not provided" });
    return;
  }

  const index = cart.products?.findIndex((p) => p.id === productId);

  if (index === undefined || index === -1) {
    res.status(404).json({ error: "Product not found in cart" });
    return;
  }

  cart.products?.splice(index, 1);

  res.status(200).json({
    ...cart,
  } as Cart);
}
