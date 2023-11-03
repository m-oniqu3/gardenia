import { StoreProvider } from '@client/utils/createStore';
import { Routes } from '@generouted/react-router';

const storesImports = import.meta.glob<{
	default?: StoreProvider<any>;
}>('./stores/*.ts', {
	eager: true,
});

const storeContexts = new Set<StoreProvider<any>>();
for (const storeImport of Object.values(storesImports)) {
	if (storeImport.default) storeContexts.add(storeImport.default);
}

export function App() {
	return Array.from(storeContexts).reduce((children, Provider) => {
		return <Provider>{children}</Provider>;
	}, <Routes />);
}
