import { TypedUseSelectorHook, useSelector, shallowEqual } from "react-redux";
import { RootState } from "@/app/lib/redux/store";

const useShallowEqualSelector: TypedUseSelectorHook<RootState> = (selector) =>
  useSelector(selector, shallowEqual);

export default useShallowEqualSelector;
