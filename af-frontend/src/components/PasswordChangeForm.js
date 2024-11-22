// src/components/PasswordInput.js
import React from 'react';

const PasswordChangeForm = ({ password, setPassword, confirmPassword, setConfirmPassword }) => {
    return (
        <div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
        </div>
    );
};

export default PasswordChangeForm;
