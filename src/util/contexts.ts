import { useReducer } from "react";

export type ReducerTyped<T> =
    { [K in keyof T]: T[K] }
    & {
        set: {
            [K in keyof T]: (newVal: T[K]) => void
        }
    }

type PartialDeep<TType> = {
    [key in keyof TType]?: PartialDeep<TType[key]>
}

export function undef<TType>(): TType | undefined {
    return undefined;
}

export function def<TType>(val: TType): TType {
    return val;
}

export function throwNoProvider(): void {
    throw new Error('You forget to add a provider');
}

export function useReducerTyped<T extends {} = {}>(defaults: T): ReducerTyped<T> {

    if ('set' in defaults) {
        throw new Error();
    }

    const [state, dispatch] = useReducer(
        (state: any, newState: { propName: string, newVal: any }) => ({
            ...state,
            [newState.propName]: newState.newVal
        }), defaults
    );

    const states: PartialDeep<ReducerTyped<T>> = {
        ...state,
        set: {}
    };

    for (const key of Object.getOwnPropertyNames(defaults)) {
        (states.set as any)[key] = (newVal: any) => dispatch({
            propName: key,
            newVal
        });
    }

    return states as ReducerTyped<T>;
}

export function defaultContextFactory
    <THooksStateDefaults = undefined, TAdditionalState = undefined>
    (hookStateDeatults: THooksStateDefaults, additionalState: TAdditionalState): ReducerTyped<THooksStateDefaults> & TAdditionalState {

    if ('set' in hookStateDeatults || 'set' in additionalState) {
        throw new Error();
    }

    const defContext: PartialDeep<ReducerTyped<THooksStateDefaults> & TAdditionalState> = additionalState;
    defContext.set = {};

    for (const key of Object.getOwnPropertyNames(hookStateDeatults)) {
        (defContext as any)[key] = (hookStateDeatults as any)[key];
        (defContext.set as any)[key] = throwNoProvider;
    }

    return defContext as ReducerTyped<THooksStateDefaults> & TAdditionalState;
}