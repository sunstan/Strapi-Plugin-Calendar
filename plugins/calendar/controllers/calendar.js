'use strict';

module.exports = {

    find: async (ctx) => {

        const pluginStore = strapi.store({
            environment: strapi.config.environment,
            type: 'plugin',
            name: 'calendar-events',
        });

        const events = await pluginStore.get({key: 'events'});

        ctx.send({events: events || []});
    },

    update: async (ctx) => {

        const {user} = ctx.state;
        const {events} = ctx.request.body;

        if (user.roles[0].id !== 1)
            return ctx.rejectUnauthorized('Only admin!');

        if (!events)
            return ctx.throw(400, 'Events not provided');

        try {
            const pluginStore = strapi.store({
                environment: strapi.config.environment,
                type: 'plugin',
                name: 'calendar-events',
            });

            await pluginStore.set({key: 'events', value: events});

            ctx.send({success: true});
        } catch (e) {
            ctx.send({success: false});
        }
    }
};
