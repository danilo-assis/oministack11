const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index)

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create)


//-----------------------------------------------

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
  })
}), IncidentController.index)

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(), 
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value:  Joi.number().required(),    
  })
}), IncidentController.create)

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
  })
}), IncidentController.delete)

//-----------------------------------------------

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(), 
  }).unknown()
}), ProfileController.index)

module.exports = routes;



// const express = require('express');

// const routes = express.Router();


// routes.post('/users', (request, response) => {
//   //app.get('/users/:id', (request, response) => {
//    // const params = request.query;
//   //const params = request.params;
//   const body = request.body;
  
//     console.log(body);
  
//     return response.json({
//       evento: 'Oministack',
//       nome: 'danilo albudane'
//     });
//   });

//   module.exports = routes;
