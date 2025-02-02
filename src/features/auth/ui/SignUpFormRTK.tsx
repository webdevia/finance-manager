import React, { useState } from 'react';
import { useSignUpUserMutation, ServerErrors } from '../authApi';
import { COMMAND_ID } from 'src/shared/consts';

const SignUpFormRTK: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpUser, { isLoading, error }] = useSignUpUserMutation();
    const [info, setInfo] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setInfo(null);

        try {
            const result = await signUpUser({ email, password, commandId: COMMAND_ID }).unwrap();
            setInfo(`Registration successful. Token: ${result.token}`);
        } catch (err) {
            console.error('Registration failed:', err);
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

            {error && 'data' in error && (
                <div style={{ color: 'red' }}>{(error.data as ServerErrors).errors.map((error) => error.message)}</div>
            )}
            {info && <div style={{ color: 'green' }}>{info}</div>}
        </form>
    );
};

export default SignUpFormRTK;