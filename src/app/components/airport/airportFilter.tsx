import { ChangeEvent, useEffect, useState } from 'react';
import { IFilter } from '../../models/models';
import Loader from '../loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { airportSlice } from '../../store/slices/airportSlice';

const AirportFilter = () => {
    const dispatch = useAppDispatch();
    const { countries, states, loading } = useAppSelector(
        state => state.handbookReducer
    );
    const [filter, setFilter] = useState<IFilter>({
        country: '',
        state: '',
    });

    useEffect(() => {
        dispatch(airportSlice.actions.filter(filter));
    }, [filter]);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFilter(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const hasFilter = () => {
        return filter.country || filter.state;
    };

    const clearFilter = () => {
        setFilter({
            country: '',
            state: '',
        });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="mb-3 py-5 px-5 border">
            <span className="mr-5 font-bold">Filter</span>

            <select
                className="mr-5 py-2 px-2 border"
                name="country"
                value={filter.country}
                onChange={handleChange}
            >
                <option value="" disabled>
                    Country
                </option>
                {countries.map(country => (
                    <option key={country}>{country}</option>
                ))}
            </select>

            <select
                className="mr-5 py-2 px-2 border"
                name="state"
                value={filter.state}
                onChange={handleChange}
            >
                <option value="" disabled>
                    State
                </option>
                {states.map(state => (
                    <option key={state}>{state}</option>
                ))}
            </select>

            {hasFilter() && (
                <button
                    className="py-2 px-4 bg-red-500 rounded text-white"
                    onClick={clearFilter}
                >
                    &times;
                </button>
            )}
        </div>
    );
};

export default AirportFilter;
