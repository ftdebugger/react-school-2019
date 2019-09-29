import { AppState } from 'store';

export interface ExpressState {
    state: AppState;

    files: Record<string, string>;
    css: string[];
    js: string[];
}
