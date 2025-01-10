import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from '../../models/models';

interface CommentState {
    comments: IComment[];
    loading: boolean;
    error: string;
}

const initialState: CommentState = {
    comments: [],
    loading: false,
    error: '',
};

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        fetch(state) {
            state.loading = true;
        },
        fetchSuccess(state, action: PayloadAction<IComment[]>) {
            state.loading = false;
            state.comments = action.payload;
            state.error = '';
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false;
            state.error = action.payload.message;
        },
        addComment(state, action: PayloadAction<IComment>) {
            state.comments.push(action.payload);
        },
    },
});

export default commentSlice.reducer;
