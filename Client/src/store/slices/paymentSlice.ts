import { Coin } from "@/entities/Coin";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  coinsList: Coin[];
}

const initialState: InitialState = {
  coinsList: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setCoins(state, action: PayloadAction<Coin[]>) {
      state.coinsList = action.payload;
    },
    paymentAddCoin(state, action: PayloadAction<Coin>) {
      const coinInList: Coin | undefined = state.coinsList.find(
        (c) => c.id == action.payload.id
      );

      if (coinInList) coinInList.count++;
    },
    paymentRemoveCoin(state, action: PayloadAction<Coin>) {
      const coinInList: Coin | undefined = state.coinsList.find(
        (c) => c.id == action.payload.id
      );

      if (coinInList) coinInList.count--;
    },
    setCoinCount(state, action: PayloadAction<Coin>) {
      const coinInList: Coin | undefined = state.coinsList.find(
        (c) => c.id == action.payload.id
      );

      if (coinInList) coinInList.count = action.payload.count;
    },
  },
});

export const { setCoins, paymentAddCoin, paymentRemoveCoin, setCoinCount } =
  paymentSlice.actions;
export default paymentSlice.reducer;
