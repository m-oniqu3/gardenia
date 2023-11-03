import { reactive } from '@client/utils/reactive';
import { assign } from '@sa-net/utils';
import {
	Context,
	ReactNode,
	createContext,
	createElement,
	useCallback,
	useContext,
} from 'react';

export type StoreProvider<State extends Record<any, any>> = ({
	children,
	value,
}: {
	children: ReactNode;
	value?: State;
}) => JSX.Element;

export interface Store<State extends Record<any, any>> {
	(): State;
	Provider: StoreProvider<State>;
}

export function createStore<State extends Record<string, any>>(
	name: string,
	initState: State,
): [() => State, Context<State>] {
	const Context = createContext(initState);
	Context.displayName = name;

	function useStore() {
		const context = useContext(Context);
		const getStore = useCallback(() => {
			return context ?? initState;
		}, [context]);

		return getStore();
	}

	return [useStore, Context];
}
