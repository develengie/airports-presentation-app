import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/loader';
import CommentForm from '../components/comment/commentForm';
import Comment from '../components/comment/comment';
import ErrorMessage from '../components/errorMessage';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchAirport, fetchComments } from '../store/actionCreators';

const AirportPage = () => {
    const dispatch = useAppDispatch();
    const { _id } = useParams<{ _id: string }>();
    const { airport, loading } = useAppSelector(
        state => state.airportDetailReducer
    );
    const { isAuth } = useAppSelector(state => state.authReducer);
    const { comments, loading: commentLoading } = useAppSelector(
        state => state.commentReducer
    );

    useEffect(() => {
        dispatch(fetchAirport(_id!));
        dispatch(fetchComments(_id!));
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container max-w-[800px] mx-auto pt-5">
            <h1 className="font-bold text-3xl">{airport?.name}</h1>
            <p>Country: {airport?.country}</p>
            <p>State: {airport?.state}</p>
            <p>City: {airport?.city}</p>
            <p>ICAO: {airport?.icao}</p>
            <p>IATA: {airport?.iata}</p>
            <p>LAT: {airport?.lat}</p>
            <p>LON: {airport?.lon}</p>
            <p>TZ: {airport?.tz}</p>

            <hr className="my-3" />

            {isAuth && <CommentForm airportId={_id!} />}

            {commentLoading ? (
                <Loader />
            ) : comments.length ? (
                comments.map(comment => (
                    <Comment key={comment._id} comment={comment} />
                ))
            ) : (
                <ErrorMessage error="No comments!" />
            )}
        </div>
    );
};

export default AirportPage;
