import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchFortune } from './fortuneSlice';

const FortuneTeller: React.FC = () => {
    const dispatch = useAppDispatch();
    const fortune = useAppSelector((state) => state.fortune);

    useEffect(() => {
        dispatch(fetchFortune());
    }, [dispatch]);

    let content;

    if (fortune.status === 'loading') {
        content = <p>Loading...</p>;
    } else if (fortune.status === 'succeeded') {
        content = <p>{fortune.message}</p>;
    } else if (fortune.status === 'failed') {
        content = <p>{fortune.error}</p>;
    }

    return (
        <div>
            <h1>Smart Host Greeter</h1>
            {content}
        </div>
    );
};

export default FortuneTeller;