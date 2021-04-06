import {atom} from 'recoil';

export const currentState = atom({
    key: 'current-state',
    default: null,
});
