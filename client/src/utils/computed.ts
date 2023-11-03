import { Ref, RefSymbol } from '@client/utils/ref';

export type Computed<Value> = Ref<Value>;

export function computed<Value>(
	get: () => Value,
	set?: (value: Value) => void,
): Computed<Value> {
	return {
		[RefSymbol]: true,
		get value() {
			return get();
		},
		set value(value) {
			if (set) set(value);
			else console.warn('Cannot set computed value');
		},
	};
}
