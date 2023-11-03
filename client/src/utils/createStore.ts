import { reactive } from '@client/utils/reactive';
import { FunctionType } from '@sa-net/utils';
import {
	Dispatch,
	Reducer,
	createContext,
	createElement,
	useContext,
	useReducer,
} from 'react';

export type StoreAction<Prop, Value> = {
	prop: Prop;
	value: Value;
};

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
	T,
>() => T extends Y ? 1 : 2
	? A
	: B;

type WritableKeys<T> = {
	[P in keyof T]-?: IfEquals<
		{ [Q in P]: T[P] },
		{ -readonly [Q in P]: T[P] },
		P
	>;
}[keyof T];

export type StoreReducer<State extends Record<string, any>> = Reducer<
	State,
	StoreAction<WritableKeys<State>, State[WritableKeys<State>]>
>;

export type StoreDispatch<State extends Record<string, any>> = Dispatch<
	StoreAction<WritableKeys<State>, State[WritableKeys<State>]>
>;

export function createStore<State extends Record<string, any>>(
	name: string,
	setup: () => State,
) {
	const Context = createContext<[State, StoreDispatch<State>] | null>(null);
	Context.displayName = name;

	function createStore() {
		const [state, dispatch] = useReducer<StoreReducer<State>>(
			(state, action) => {
				const { prop, value } = action;
				const newState = {} as State;
				const descs = Object.getOwnPropertyDescriptors(state);

				// in order to maintain reactivity, we need to create a new object
				// in order to maintain a proper copy of the state, we need to copy
				// all the property descriptors from the old state to the new state
				// this ensures that the new state has the same getters and setters
				for (const [key, desc] of Object.entries(descs)) {
					if (key === prop) {
						// ensure that the property is writable
						if (desc.set) desc.set(value);
						else if ('value' in desc) desc.value = value;
						else throw new Error(`Cannot set ${key} in ${name}`);
					}

					Object.defineProperty(newState, key, desc);
				}

				return newState;
			},
			setup(),
		);

		return new Proxy(state, {
			get(target, prop, r) {
				if (prop === '$dispatch') return dispatch;
				else if (prop === '$provide') return [target, dispatch];
				return Reflect.get(target, prop, r);
			},
			set(_, prop, value) {
				dispatch({ prop: prop as WritableKeys<State>, value });
				return true;
			},
		}) as State & {
			$dispatch: StoreDispatch<State>;
			$provide: [State, StoreDispatch<State>];
		};
	}

	function useStore() {
		const context = useContext(Context);
		if (!context)
			throw new Error(
				`${name} context is not provided. Did you forget to wrap your app with <${name}Context.Provider />?}`,
			);

		return context[0];
	}

	return [createStore, useStore, Context] as const;
}
