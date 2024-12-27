"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export function ReduxProvider(props: { children: React.ReactNode }) {
	return <Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			{props.children}
		</PersistGate>
	</Provider>;
}
