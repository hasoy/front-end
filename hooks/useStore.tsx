import { useContext } from "react";
import { Store, StoreContext } from "../stores/index.store";

export const useStore = (): Store => useContext({ ...StoreContext });
