"use client";

import {
  selectCart,
  selectShippingPrice,
  selectSubtotal,
  selectTaxes,
  selectTotal,
  selectTotalCouponsAmount,
} from "@store/app/selectors";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "@hooks/useThunkDispatch";
import {
  recalculateShippingAsync,
  recalculateTaxesAsync,
} from "../store/app/thunks";

const Cart = () => {
  const cart = useSelector(selectCart);
  const dispatch = useThunkDispatch();
  const subtotal = useSelector(selectSubtotal);
  const shippingPrice = useSelector(selectShippingPrice);
  const taxes = useSelector(selectTaxes);
  const total = useSelector(selectTotal);
  const couponsAmountRef = useRef(useSelector(selectTotalCouponsAmount));
  const couponsAmount = couponsAmountRef.current;

  useEffect(() => {
    dispatch(recalculateShippingAsync()).unwrap();
  }, [dispatch, cart]);

  useEffect(() => {
    dispatch(recalculateTaxesAsync()).unwrap();
  }, [dispatch, shippingPrice]);

  useEffect(() => {
    let newMinTotal = (subtotal + shippingPrice + taxes) / 2;

    if (total < newMinTotal) {
      setErrorMessage(
        `The total combination of discounts cannot exceed 50%. Your cart will be updated to reflect a max of 50% off.`
      );
      couponsAmountRef.current = newMinTotal;
    }
  }, [shippingPrice, taxes, subtotal, total]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {(cart.products ?? []).map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>${p.price.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <p>Sub-total: ${subtotal}</p>
        <p>Coupons: -${couponsAmount}</p>
        <p>Shipping: ${shippingPrice}</p>
        <p>Taxes: ${taxes}</p>
        <p>Total: ${total}</p>
      </div>
    </>
  );
};

export default Cart;
function setErrorMessage(arg0: string) {
  throw new Error("Function not implemented.");
}
