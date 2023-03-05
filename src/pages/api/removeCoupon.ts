import { Cart } from "@models/cart";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;
  const couponId = req.query.id;

  if (!couponId) {
    res.status(400).json({ error: "Coupon ID not provided" });
    return;
  }

  const index = cart.coupons?.findIndex((c) => c.id === couponId);

  if (index === undefined || index === -1) {
    res.status(404).json({ error: "Coupon not found in cart" });
    return;
  }

  cart.coupons?.splice(index, 1);

  res.status(200).json({
    ...cart,
  } as Cart);
}
