import { Ref, isRef } from '@client/utils/ref';
import { useState } from 'react';

export type Reactive<Obj extends Record<any, any>> = {
	[Key in keyof Obj]: Obj[Key] extends Ref<infer Value> ? Value : Obj[Key];
};

export function reactive<Obj extends Record<any, any>>(
	target: Obj,
): Reactive<Obj> {
	const [state, setState] = useState(target);

	return new Proxy(state, {
		get(_, key: keyof Obj) {
			const value = state[key];

			if (isRef(value)) {
				return value.value;
			}

			return value;
		},
		set(_, key: keyof Obj, value) {
			console.log('reactive set', key, value);
			if (isRef(state[key])) {
				state[key].value = value;
			} else
				setState({
					...state,
					[key]: value,
				});

			return true;
		},
	});
}
