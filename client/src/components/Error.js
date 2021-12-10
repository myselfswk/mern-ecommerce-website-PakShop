import React from 'react';

const Error = ({ error }) => {
    return (
        <div className="mt-2">
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        </div>
    )
}

export default Error;
