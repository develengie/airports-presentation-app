interface ErrorMessageProps {
    error: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
    return <p className="text-lg text-red-500 text-center">{error}</p>;
};

export default ErrorMessage;
