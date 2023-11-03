import { reactive } from '@client/utils/reactive';
import { assign } from '@sa-net/utils';
import { ReactNode, createContext, createElement, useContext } from 'react';

export interface Store<State extends Record<any, any>> {
	(): State;
	Provider: ({ children }: { children: ReactNode }) => ReactNode;
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

	const Provider: Store<any>['Provider'] = ({ children }) => {
		const state = reactive(initState);
		return createElement(Context.Provider, { value: state }, children);
	};

	return assign(useStore, {
		Provider,
	});
}
