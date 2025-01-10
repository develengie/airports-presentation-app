import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IAuth, IAuthLoginValidationErrors } from '../models/models';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { useAppDispatch } from '../hooks/redux';
import { login, register } from '../store/actionCreators';

interface ValidationErrors {
    [key: string]: string;
}

const AuthPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<IAuth>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<IAuthLoginValidationErrors>({});
    const isValid = Object.keys(errors).length === 0;
    const validateSchema = yup.object({
        email: yup
            .string()
            .email('E-mail entered incorrectly!')
            .required('E-mail is required!'),
        password: yup
            .string()
            .min(8, 'The password must contain at least 8 characters!')
            .required('Password is required!'),
    });

    useEffect(() => {
        validate();
    }, [userData]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            await dispatch(register(userData, navigate, toast));
        }
    };

    const handleLogin = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            await dispatch(login(userData, navigate, toast));
        }
    };

    const validate = async () => {
        setErrors({});

        try {
            await validateSchema.validate(userData, { abortEarly: false });
        } catch (e: unknown) {
            const error = e as ValidationError;
            const validationErrors: ValidationErrors = {};

            error.inner.forEach(e => {
                validationErrors[e.path!] = e.message;
            });

            setErrors(validationErrors);
        }
    };

    return (
        <form
            className="container max-w-[800px] mx-auto pt-5"
            onSubmit={handleSubmit}
        >
            <div className="mb-3">
                <label className="block" htmlFor="email">
                    E-mail
                </label>
                <input
                    className="w-full py-2 px-2 border outline-0"
                    id="email"
                    name="email"
                    type="text"
                    value={userData.email}
                    onChange={handleChange}
                />
                {errors.email && (
                    <div className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.email}
                    </div>
                )}
            </div>

            <div className="mb-3">
                <label className="block" htmlFor="password">
                    Password
                </label>
                <input
                    className="w-full py-2 px-2 border outline-0"
                    id="password"
                    name="password"
                    type="text"
                    value={userData.password}
                    onChange={handleChange}
                />
                {errors.password && (
                    <div className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {errors.password}
                    </div>
                )}
            </div>

            <button
                className="mr-3 py-2 px-4 bg-blue-500 text-white"
                disabled={!isValid}
            >
                Register
            </button>

            <button
                className="py-2 px-4 bg-green-500 text-white"
                type="button"
                disabled={!isValid}
                onClick={handleLogin}
            >
                Login
            </button>
        </form>
    );
};

export default AuthPage;
