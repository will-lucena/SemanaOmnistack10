const axios = require("axios")
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray.js')

module.exports = {
    async index(request, response) {
        const devs = await Dev.find()

        return response.json(devs)
    },

    async show(request, response) {
        const devs = await Dev.find({
            github_username: request.params.github_username
        })
        return response.json(devs)
    },

    async store(request, response) {
        const { github_username, stack, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const api_response = await axios.get(`https://api.github.com/users/${github_username}`)
            const { name = login, avatar_url, bio } = api_response.data;
            const stackArray = parseStringAsArray(stack)
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                stack: stackArray,
                location
            })
        }
        return response.json(dev)
    },

    async update(request, response) {
        return response.json({ status: 500, message: "Not implemented yet" })
    },

    async destroy(request, response) {
        return response.json({ status: 500, message: "Not implemented yet" })
    },
}