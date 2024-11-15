import { Result } from "../types";


export function unwrap<T, E>(result: Result<T, E>): T {
    if (result.ok) {
        return result.value;
    } else {
        throw result.error;
    }
}