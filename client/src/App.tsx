import { StoreProvider } from '@client/utils/createStore';
import { Routes } from '@generouted/react-router';
import { toEntries } from '@sa-net/utils';

const storesImports = import.meta.glob<{
	default?: StoreProvider<any>;
}>('./stores/*.ts', {
	eager: true,
});

const storeContexts = new Set<StoreProvider<any>>();
for (const [importPath, storeImport] of toEntries(storesImports)) {
	console.info(`Loading store ${importPath}`);
	if (storeImport.default) storeContexts.add(storeImport.default);
	else console.warn(`No default export found for ${importPath}`);
}

export function App() {
	return Array.from(storeContexts).reduce((children, Provider) => {
		return Provider({ children });
	}, <Routes />);
}
