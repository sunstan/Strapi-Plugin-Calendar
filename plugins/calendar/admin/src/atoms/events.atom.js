import {atom, selector, selectorFamily} from 'recoil';
import {request} from 'strapi-helper-plugin';
import pluginId from '../pluginId';

export const calendarState = atom({
    key: 'calendar-state',
    default: [],
});

export const eventsState = selector({
    key: 'events-state',
    get: ({get}) => get(calendarState),
});

export const eventState = selectorFamily({
    key: 'event-state',
    get: (id) => ({get}) => get(eventsState).find(e => e.id === id)
})

export const setEventsState = ({set}) => async value => {
    const {success} = await request(`/${pluginId}/events`, {method: 'POST', body: {events: value}});
    if (success) set(calendarState, value);
};