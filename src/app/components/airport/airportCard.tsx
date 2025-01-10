import { useNavigate } from 'react-router-dom';
import { IAirport } from '../../models/models';

interface AirportCardProps {
    airport: IAirport;
}

const AirportCard = ({ airport }: AirportCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/airport/${airport._id}`);
    };

    return (
        <div
            className="mb-3 py-5 px-5 border rounded-md cursor-pointer hover:shadow-md hover:transition-all"
            onClick={handleClick}
        >
            <p className="font-bold text-lg">{airport?.name}</p>
            <p>{airport?.country}</p>
            <p>{airport?.state}</p>
            <p>{airport?.city}</p>
        </div>
    );
};

export default AirportCard;
