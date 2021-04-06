import {Calendar} from '../../components/Calendar';
import {currentState} from '../../atoms/current.atom';
import {eventState} from '../../atoms/events.atom';
import {Event} from '../../components/Event';
import {useRecoilValue} from 'recoil';
import React, {memo} from 'react';
import './home.css';

const HomePage = () => {

    const current = useRecoilValue(currentState);
    const event = useRecoilValue(eventState(current));

    return (
        <div className="home">
            <Calendar/>
            {current && event && <Event/>}
        </div>
    );
};

export default memo(HomePage);
