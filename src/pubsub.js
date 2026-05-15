const pubsub = {
    events: {},

    subscribe: (event, fn) => {
        console.log(`PUBSUB: Someone just subscriber to ${event}`)
        if(!pubsub.events[event]){
            pubsub.events[event] = []
        }
        pubsub.events[event].push(fn)
    },

    publish: (event, data) => {
        console.log(`PUBSUB: Broadcast ${event}, ${data}`)
        // if(!pubsub.event[event]) return
        pubsub.events[event].forEach(fn => {
            fn(data)
        })
    }
}

export { pubsub }