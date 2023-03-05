import { useThunkDispatch } from "@hooks/useThunkDispatch";
import { addCouponAsync } from "@store/app/thunks";
import { selectCart } from "@store/app/selectors";
import { useSelector } from "react-redux";

const AddCoupon = () => {
  const thunkDispatch = useThunkDispatch();
  const cart = useSelector(selectCart);
  const numberCoupons = cart.coupons?.length ?? 0;
  const showButton = numberCoupons < 2;
  return (
    <>
      {showButton ?? (
        <button
          onClick={async () => await thunkDispatch(addCouponAsync()).unwrap()}
        >
          Add Coupon
        </button>
      )}
    </>
  );
};

export default AddCoupon;
