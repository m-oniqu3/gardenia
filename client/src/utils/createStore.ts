import {
	Dispatch,
	Reducer,
	createContext,
	useContext,
	useReducer,
} from 'react';

// next two types are from https://stackoverflow.com/a/52473108/10539019
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
	T,
>() => T extends Y ? 1 : 2
	? A
	: B;

type MethodKeys<T> = {
	[K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type ReadonlyKeys<T> = {
	[P in keyof T]-?: IfEquals<
		{ [Q in P]: T[P] },
		{ -readonly [Q in P]: T[P] },
		never,
		P
	>;
}[keyof T];

type WritableKeys<T> = Exclude<
	keyof T,
	MethodKeys<T> | ReadonlyKeys<T> | symbol
>;

export type StoreWritableState<State> = {
	[Key in WritableKeys<State>]: State[Key];
};

export type StoreAction<Type, Payload> = {
	type: Type;
	payload: Payload;
};

export type StoreSetAction<State> = StoreAction<
	'@set',
	{ prop: keyof State; value: State[keyof State] }
>;

export type StoreAssignAction<State> = StoreAction<
	'@assign',
	StoreWritableState<State>
>;

export type StoreActions<State extends Record<string, any>> =
	| StoreSetAction<State>
	| StoreAssignAction<State>;

export type StoreReducer<State extends Record<string, any>> = Reducer<
	State,
	StoreActions<State>
>;

export type StoreDispatch<State extends Record<string, any>> = Dispatch<
	StoreActions<State>
>;

export type Store<State extends Record<string, any>> = {
	$dispatch: StoreDispatch<State>;
	$update<Key extends WritableKeys<State>>(prop: Key, value: State[Key]): void;
	$assign(state: StoreWritableState<State>): void;
} & Omit<State, ReadonlyKeys<State> | MethodKeys<State>> &
	Readonly<Pick<State, ReadonlyKeys<State> | MethodKeys<State>>>;

export function createStore<State extends Record<string, any>>(
	name: string,
	setup: () => State,
) {
	const Context = createContext<Store<State> | null>(null);
	Context.displayName = name;

	function createStore() {
		const [state, dispatch] = useReducer<StoreReducer<State>>(
			(state, action) => {
				const { type, payload } = action;

				function set(prop: keyof State, value: State[keyof State]) {
					// ensure that the property is writable
					const desc = Object.getOwnPropertyDescriptor(state, prop);

					if (!desc || desc.writable || desc.set) state[prop] = value;
					else throw new Error(`Cannot set ${String(prop)} in ${name}`);
				}

				switch (type) {
					case '@set': {
						const { prop, value } = payload as StoreSetAction<State>['payload'];
						set(prop, value);
						break;
					}
					case '@assign': {
						const state = payload as StoreAssignAction<State>['payload'];
						for (const [prop, value] of Object.entries(state))
							set(prop as keyof State, value as State[keyof State]);
						break;
					}
				}

				const newState = {} as State;
				const descs = Object.getOwnPropertyDescriptors(state);

				// in order to maintain reactivity, we need to create a new object
				// in order to maintain a proper copy of the state, we need to copy
				// all the property descriptors from the old state to the new state
				// this ensures that the new state has the same getters and setters
				for (const [key, desc] of Object.entries(descs)) {
					Object.defineProperty(newState, key, desc);
				}

				return newState;
			},
			setup(),
		);

		return new Proxy(state, {
			get(target, prop, r) {
				if (prop === '$dispatch') return dispatch;
				else if (prop === '$update')
					return (prop: any, value: any) =>
						dispatch({ type: '@set', payload: { prop, value } });
				else if (prop === '$assign')
					return (state: any) => dispatch({ type: '@assign', payload: state });

				return Reflect.get(target, prop, r);
			},
			set(_, prop, value) {
				dispatch({
					type: '@set',
					payload: { prop: prop as WritableKeys<State>, value },
				});
				return true;
			},
		}) as any as Store<State>;
	}

	function useStore() {
		const context = useContext(Context);

		if (!context) return createStore();
		return context;
	}

	return [useStore, Context] as const;
}
