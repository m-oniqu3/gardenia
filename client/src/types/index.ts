import { Reactive } from '@client/utils/reactive';
import { Ref } from '@client/utils/ref';
import { FunctionType } from '@sa-net/utils';

export type ComponentChildren =
	| JSX.Element
	| string
	| number
	| null
	| undefined
	| boolean
	| Array<ComponentChildren>;

export type Unwrap<V> = V extends FunctionType
	? V
	: V extends Ref<infer U>
	? U
	: V extends Reactive<any>
	? {
			[K in keyof V]: Unwrap<V[K]>;
	  }
	: V;
