import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import AirportSearch from '../components/airport/airportSearch';
import AirportFilter from '../components/airport/airportFilter';
import AirportCard from '../components/airport/airportCard';
import Loader from '../components/loader';
import ErrorMessage from '../components/errorMessage';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchAirports } from '../store/actionCreators';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { airports, loading, error } = useAppSelector(
        state => state.airportReducer
    );
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
    const airportsCount = airports.length;
    const endOffset = itemOffset + itemsPerPage;
    const currentAirports = airports.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(airportsCount / itemsPerPage);

    useEffect(() => {
        dispatch(fetchAirports());
    }, [dispatch]);

    const handlePageClick = ({ selected }: { selected: number }) => {
        const newOffset = (selected * itemsPerPage) % airportsCount;
        setItemOffset(newOffset);
    };

    return (
        <div className="container max-w-[800px] mx-auto pt-5">
            <AirportSearch />
            <AirportFilter />

            {loading && <Loader />}
            {error && <ErrorMessage error={error} />}
            {currentAirports.map(airport => (
                <AirportCard key={airport._id} airport={airport} />
            ))}

            {airports.length > itemsPerPage && (
                <ReactPaginate
                    activeClassName="bg-gray-500 text-white"
                    containerClassName="flex justify-center pb-3"
                    nextClassName="ml-2 py-2 px-2 border"
                    pageClassName="mx-2 py-2 px-2 border"
                    previousClassName="mr-2 py-2 px-2 border"
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            )}
        </div>
    );
};

export default MainPage;
