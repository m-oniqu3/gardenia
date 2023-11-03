import { inRecord } from '@sa-net/utils';
import { useState } from 'react';

export type Ref<Value> = {
	[RefSymbol]: true;
	value: Value;
};
export type UnwrapRef<T> = T extends Ref<infer V> ? V : T;

export const RefSymbol = Symbol('Ref');

export function ref<Value>(init: Value): Ref<Value> {
	const [value, setValue] = useState(init);
	return {
		[RefSymbol]: true,
		get value() {
			return value;
		},
		set value(value) {
			setValue(value);
		},
	};
}

export function isRef<Value>(thing: unknown): thing is Ref<Value> {
	return inRecord(thing, [RefSymbol]);
}
