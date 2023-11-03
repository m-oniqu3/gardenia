import { useState } from 'react';

export function reactive<Obj extends Record<any, any>>(target: Obj): Obj {
	const [state, setState] = useState(target);

	return new Proxy(state, {
		set(target, key, value) {
			setState({ ...target, [key]: value });
			return true;
		},
	});
}
