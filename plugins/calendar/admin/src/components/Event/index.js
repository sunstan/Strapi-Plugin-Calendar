import {Button, Flex, InputText, Padded, Text, Textarea} from '@buffetjs/core';
import {eventsState, eventState, setEventsState} from '../../atoms/events.atom';
import {useRecoilCallback, useRecoilState, useRecoilValue} from 'recoil';
import {faTrash, faSave} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {currentState} from '../../atoms/current.atom';
import {DateTime} from '@buffetjs/custom';
import {colors} from '../../utils/colors';
import React, {useState} from 'react';
import {Color} from '../Color';
import './event.css';

export const Event = () => {

    const [current, setCurrent] = useRecoilState(currentState);
    const setEvents = useRecoilCallback(setEventsState);
    const event = useRecoilValue(eventState(current));
    const events = useRecoilValue(eventsState);

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState(event);

    const setTitle = ({target: {value}}) => {
        setState({...state, title: value});
    }

    const setDescription = ({target: {value}}) => {
        setState({...state, description: value});
    }

    const setColor = ({target}) => {
        const color = target.getAttribute('color');
        setState({...state, color});
    }

    const setStart = ({target: {value}}) => {
        setState({...state, start: new Date(value)});
    }

    const setEnd = ({target: {value}}) => {
        setState({...state, end: new Date(value)});
    }

    const handleSave = async () => {
        setLoading(true);
        setEvents(events.map(e => e.id === current ? state : e))
            .finally(() => setLoading(false));
    }

    const handleDelete = () => {
        if (window.confirm('Supprimer cet évènement ?')) {
            setEvents(events.filter(e => e.id !== current)).then();
            setCurrent(null);
        }
    }

    return (
        <div className="event" key={current}>

            <Text fontSize="lg" fontWeight="bold">Evènement</Text>

            <Padded top size="md">
                <Text lineHeight="2" fontSize="md" fontWeight="bold">Nom de l'évènement</Text>
                <InputText name="title" value={state.title} onChange={setTitle}/>
            </Padded>

            <Padded top size="md">
                <Flex justifyContent="space-between">
                    {colors.map(c => <Color key={c} color={c} active={c === state.color} onClick={setColor}/>)}
                </Flex>
            </Padded>

            <Padded top size="md">
                <Text lineHeight="2" fontSize="md" fontWeight="bold">Début</Text>
                <DateTime id="start" name="start" value={state.start} onChange={setStart}/>
            </Padded>

            <Padded top size="md">
                <Text lineHeight="2" fontSize="md" fontWeight="bold">Fin</Text>
                <DateTime id="end" name="end" value={state.end} onChange={setEnd}/>
            </Padded>

            <Padded top size="md">
                <Text lineHeight="2" fontSize="md" fontWeight="bold">Description</Text>
                <Textarea name="description" value={state.description} onChange={setDescription}/>
            </Padded>

            <Padded top size="md">
                <Flex justifyContent="space-between">

                    <Button icon={<FontAwesomeIcon icon={faSave}/>} disabled={event === state} isLoading={loading}
                            color="primary" onClick={handleSave}>Enregister</Button>

                    <Button icon={<FontAwesomeIcon icon={faTrash}/>}
                            color="delete" onClick={handleDelete}>Supprimer</Button>
                </Flex>
            </Padded>

        </div>
    );
}