import React, { useState } from 'react';
import { API_URL, COMMAND_ID } from 'src/shared/consts';
import { ServerErrors, SignUpUserResponse } from '../authApi';

const SignUpFormFetch: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setInfo(null);

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, commandId: COMMAND_ID }),
            });

            if (!response.ok) {
                const errorData: ServerErrors = await response.json();
                const message = errorData.errors.reduce((message, error) => `${message} ${error.message}`, '');
                throw new Error(`Registration failed. Error message: ${message}`);
            }

            const data: SignUpUserResponse = await response.json();
            setInfo(`Registration successful. Token: ${data.token}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="string"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Sign Up'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {info && <div style={{ color: 'green' }}>{info}</div>}
        </form>
    );
};

export default SignUpFormFetch;