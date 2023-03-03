import { Product } from "./product";
import { Coupon } from "./coupon";

export interface Cart {
  id: string;
  // QUESTION: What does the `?` do? Is it different than using | undefined in the type?
  // Answer: The '?' allows the variables to be optional. So they can be undefined or null if not explicitly used.
  products?: Product[];
  coupons?: Coupon[];
  shippingPrice?: number;
  taxes?: number;
}
