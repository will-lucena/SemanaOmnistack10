const { Router } = require("express")
const DevController = require("./controllers/DevController")
const SearchController = require("./controllers/SearchController")

const routes = Router()

routes.get('/', (request, response) => {
    response.json({ message: "Hello world" })
});

routes.post('/devs', DevController.store)
routes.get('/devs', DevController.index)
routes.get('/devs/:github_username', DevController.show)
routes.put('/devs', DevController.update)
routes.delete('/devs', DevController.destroy)

routes.get('/search', SearchController.index)

module.exports = routes;