const Dev = require("../models/Dev")
const parseStringAsArray = require('../utils/parseStringAsArray.js')

module.exports = {
    async index(request, response) {
        const { longitude, latitude, stack } = request.query;

        const stackArray = parseStringAsArray(stack)
        console.log(stackArray)
        const devs = await Dev.find({
            stack: {
                $in: stackArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        })

        return response.json(devs)
    },
}