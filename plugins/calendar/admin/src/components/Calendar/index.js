import {useRecoilCallback, useRecoilState, useRecoilValue} from 'recoil';
import pluginId from '../../pluginId';
import React, {useEffect} from 'react';
import {colors} from '../../utils/colors';
import {request} from 'strapi-helper-plugin';
import FullCalendar from '@fullcalendar/react';
import locale from '@fullcalendar/core/locales/fr';
import {calendarState, eventsState, setEventsState} from '../../atoms/events.atom';
import interactionPlugin from '@fullcalendar/interaction';
import {currentState} from '../../atoms/current.atom';
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from '@fullcalendar/list';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/common/main.css';
import '@fullcalendar/list/main.css';
import './calendar.css';

export const Calendar = () => {

    const [cal, setCalendar] = useRecoilState(calendarState);
    const [current, setCurrent] = useRecoilState(currentState);
    const setEvents = useRecoilCallback(setEventsState);
    const events = useRecoilValue(eventsState);

    const handleSelect = ({start, end, allDay}) => {
        const description = '';
        const color = colors[0];
        const title = 'Nouvel évènement';
        const ids = events.map(e => e.id);
        const id = (Math.max(0, ...ids) + 1).toString();
        const event = {id, title, description, color, start, end, allDay};

        setEvents([...events, event]);
        setCurrent(id);
    }

    const handleClick = ({event}) => {
        setCurrent(current && current === event.id ? null : event.id);
    }

    const handleResize = ({event: {id, start, end, allDay}}) => {
        setEvents(events.map(e => e.id === id ? {...e, start, end, allDay} : e));
    }

    const handleDrop = ({event: {id, start, end, allDay}}) => {
        setEvents(events.map(e => e.id === id ? {...e, start, end, allDay} : e));
    }

    const onInit = async () => {
        const {events} = await request(`/${pluginId}/events`, {
            method: 'GET'
        });
        setCalendar(events);
    }

    useEffect(() => {onInit().catch(console.error)}, []);

    return (
        <div className="calendar" key={events}>

            <FullCalendar
                editable
                selectable

                select={handleSelect}
                eventDrop={handleDrop}
                eventClick={handleClick}
                eventResize={handleResize}

                height="100%"
                events={events}
                locale={locale}
                plugins={[
                    listPlugin,
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,listWeek'
                }}/>
        </div>
    );
}
