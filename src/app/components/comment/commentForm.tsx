import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createComment } from '../../store/actionCreators';

interface CommentFormProps {
    airportId: string;
}

const CommentForm = ({ airportId }: CommentFormProps) => {
    const dispatch = useAppDispatch();
    const { email } = useAppSelector(state => state.authReducer);
    const [commentText, setCommentText] = useState('');

    const padTo2Digits = (num: number) => {
        return num.toString().padStart(2, '0');
    };

    const formatDate = (date: Date) => {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('.');
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const comment = {
            _id: Date.now(),
            airport: airportId,
            created_at: formatDate(new Date()),
            text: commentText,
            user: email,
        };
        dispatch(createComment(comment));
        setCommentText('');
    };

    return (
        <form className="mb-3" onSubmit={handleSubmit}>
            <textarea
                className="w-full py-2 px-2 border outline-0 resize-none"
                placeholder="Type your comment here..."
                value={commentText}
                onChange={handleChange}
            />
            <button className="py-2 px-2 border hover:bg-gray-500 hover:text-white hover:transition-all">
                Create
            </button>
        </form>
    );
};

export default CommentForm;
