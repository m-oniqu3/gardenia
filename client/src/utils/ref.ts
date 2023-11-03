import { useState } from 'react';

export type Ref<Value> = { value: Value };

export function ref<Value>(init: Value): Ref<Value> {
	const [value, setValue] = useState(init);
	return {
		get value() {
			return value;
		},
		set value(value) {
			setValue(value);
		},
	};
}
