import { Computed, computed } from '@client/utils/computed';

export type RefObj<Obj extends Record<any, any>> = {
	[K in keyof Obj]: Computed<Obj[K]>;
};

export function toRefs<Obj extends Record<any, any>>(target: Obj): RefObj<Obj> {
	const refs: RefObj<Obj> = {} as any;

	for (const key in target) {
		refs[key] = computed(
			() => target[key],
			value => (target[key] = value),
		);
	}

	return refs;
}
