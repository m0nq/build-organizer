import { AppState } from '@const/AppState.ts';

export const appReducer = (state: AppState, { type, payload }: { type: AppState, payload?: File[] }) => {
    switch (type) {
        case AppState.EMPTY:
            return AppState.EMPTY;
        case AppState.ERROR:
            return AppState.ERROR;
        case AppState.PROCESSING:
            // process files
            return AppState.PROCESSING;
        case AppState.COMPLETE:
            return AppState.COMPLETE;
        default:
            return state;
    }
};

