import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { IAirport, ServerAirportResponse } from '../../models/models';
import UseInput from '../../hooks/input';
import UseDebounce from '../../hooks/debounce';

const AirportSearch = () => {
    const navigate = useNavigate();
    const [airports, setAirports] = useState<IAirport[]>([]);
    const [dropdown, setDropdown] = useState(false);
    const input = UseInput('');
    const debounced = UseDebounce<string>(input.value, 500);

    useEffect(() => {
        if (debounced.length > 3) {
            searchAirports().then(() => setDropdown(true));
        } else {
            setDropdown(false);
        }
    }, [debounced]);

    const searchAirports = async () => {
        const response = await axios.get<ServerAirportResponse>(
            'airports.json'
        );
        const searchedAirports =
            response &&
            Object.values(response.data).filter(airport =>
                airport.name.toLowerCase().includes(debounced.toLowerCase())
            );
        setAirports(searchedAirports);
    };

    return (
        <div className="mb-3 relative border">
            <input
                className="w-full h-[48px] py-3 px-3 outline-0"
                type="text"
                placeholder="Type something here..."
                {...input}
            />
            {airports.length > 0 && dropdown && (
                <ul className="h-[200px] list-none bg-white shadow-md overflow-y-scroll absolute top-[48px] right-0 left-0 z-[1]">
                    {airports.map(airport => (
                        <li
                            key={airport._id}
                            className="mb-3 py-3 px-3 cursor-pointer hover:bg-gray-300 hover:text-white hover:transition-all"
                            onClick={() => navigate(`/airport/${airport._id}`)}
                        >
                            {airport.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AirportSearch;
