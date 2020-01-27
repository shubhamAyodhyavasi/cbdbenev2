import schedule from '@ssense/sscheduler'

export const scheduler = schedule => {
    console.log({
        ...schedule
    })
}

//

const a =  { 
"duration": "15",
"interval": "15",
"id":"5dad6ba6f4ab551864e63f01", //doc id

"schedule":
    {
        "weekdays": {
            "from": "09:00", "to": "17:00",
            // "unavailability": [
            //     { "from": "12:00", "to": "13:00" }
            // ]
        },
        "unavailability": [
            { "from": "2017-02-20 00:00", "to": "2017-02-27 00:00" },
            { "from": "2017-02-02 00:00", "to": "2017-02-06 00:00" }
        ]
    }}