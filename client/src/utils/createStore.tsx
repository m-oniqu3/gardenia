import { reactive } from '@client/utils/reactive';
import { assign } from '@sa-net/utils';
import { ReactNode, createContext, useContext } from 'react';

export interface Store<State extends Record<any, any>> {
	(): State;
	Provider: ({ children }: { children: any }) => ReactNode;
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
		return <Context.Provider value={state}>{children}</Context.Provider>;
	};

	return assign(useStore, {
		Provider,
	});
}
