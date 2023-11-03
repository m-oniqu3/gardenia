export type Computed<Value> = { value: Value };

export function computed<Value>(
	get: () => Value,
	set?: (value: Value) => void,
): Computed<Value> {
	return {
		get value() {
			return get();
		},
		set value(value) {
			if (set) set(value);
			else console.warn('Cannot set computed value');
		},
	};
}
