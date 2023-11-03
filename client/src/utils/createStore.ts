import { reactive } from '@client/utils/reactive';
import { assign } from '@sa-net/utils';
import { ReactNode, createContext, createElement, useContext } from 'react';

export type StoreProvider<State extends Record<any, any>> = ({
	children,
	value,
}: {
	children: ReactNode;
	value?: State;
}) => ReactNode;

export interface Store<State extends Record<any, any>> {
	(): State;
	Provider: StoreProvider<State>;
}

export function createStore<State extends Record<any, any>>(
	name: string,
	initState: State,
): Store<State> {
	const Context = createContext(initState);
	Context.displayName = name;

	function useStore() {
		return useContext(Context);
	}

	const Provider: Store<any>['Provider'] = ({ children, value }) => {
		const state = reactive(value ?? initState);
		return createElement(Context.Provider, { value: state }, children);
	};

	return assign(useStore, {
		Provider,
	});
}
