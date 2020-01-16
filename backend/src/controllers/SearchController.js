const Dev = require("../models/Dev")
const parseStringAsArray = require('../utils/parseStringAsArray.js')

module.exports = {
    async index(request, response) {
        const { longitude, latitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs)
        console.log(techsArray)
        const devs = await Dev.find({
            technologies: {
                $in: techsArray
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