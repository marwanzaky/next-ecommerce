import { configureStore } from "@reduxjs/toolkit";

import authReducer, { AuthState } from "./slices/authSlice";
import cartReducer, { CartState } from "./slices/cartSlice";
import userProductsReducer, {
	UserProductsState,
} from "./slices/userProductsSlice";

import favoritesReducer, { FavoritesState } from "./slices/favoritesSlice";

import { TypedUseSelectorHook, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
	key: "auth",
	storage,
};

const cartPersistConfig = {
	key: "cart",
	storage,
};

const userProductsPersistConfig = {
	key: "userProducts",
	storage,
};

const favoritesPersistConfig = {
	key: "userProducts",
	storage,
};

export const store = configureStore({
	reducer: {
		authReducer: persistReducer<AuthState>(authPersistConfig, authReducer),
		cartReducer: persistReducer<CartState>(cartPersistConfig, cartReducer),
		favoritesReducer: persistReducer<FavoritesState>(
			favoritesPersistConfig,
			favoritesReducer,
		),
		userProductsReducer: persistReducer<UserProductsState>(
			userProductsPersistConfig,
			userProductsReducer,
		),
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
