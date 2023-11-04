import {
	Dispatch,
	Reducer,
	createContext,
	useContext,
	useReducer,
} from 'react';

export type StoreAction<Prop, Value> = {
	prop: Prop;
	value: Value;
};

// next two types are from https://stackoverflow.com/a/52473108/10539019
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

export type Store<State extends Record<string, any>> = State & {
	$dispatch: StoreDispatch<State>;
	$update<Key extends WritableKeys<State>>(prop: Key, value: State[Key]): void;
};

export function createStore<State extends Record<string, any>>(
	name: string,
	setup: () => State,
) {
	const Context = createContext<Store<State> | null>(null);
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
				if (prop === '$update')
					return (prop: any, value: any) => dispatch({ prop, value });
				return Reflect.get(target, prop, r);
			},
			set(_, prop, value) {
				dispatch({ prop: prop as WritableKeys<State>, value });
				return true;
			},
		}) as Store<State>;
	}

	function useStore() {
		const context = useContext(Context);

		if (!context) return createStore();
		return context;
	}

	return [useStore, Context] as const;
}
