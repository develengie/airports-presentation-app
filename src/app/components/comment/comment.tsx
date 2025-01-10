import { IComment } from '../../models/models';

interface CommentProps {
    comment: IComment;
}

const Comment = ({ comment }: CommentProps) => {
    return (
        <div className="mb-3 py-2 px-2 border rounded">
            <div className="font-thin text-xs">{comment.created_at}</div>
            <p className="text-base">{comment.text}</p>
        </div>
    );
};

export default Comment;
