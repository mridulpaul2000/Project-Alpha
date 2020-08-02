require('dotenv').config({silent: true})

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000

const cloudant = require('./lib/cloudant.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'))

const testConnections = () => {
  const status = {}
  return cloudant.info()
    .then(info => {
      status['cloudant'] = 'ok';
      return status
    })
    .catch(err => {
      console.error(err);
      status['cloudant'] = 'failed';
      return status
    });
};

const handleError = (res, err) => {
  const status = err.code !== undefined && err.code > 0 ? err.code : 500;
  return res.status(status).json(err);
};

app.get('/', (req, res) => {
  testConnections().then(status => res.json({ status: status }));
});

/**
 * Get a session ID
 *
 * Returns a session ID that can be used in subsequent message API calls.
 */
app.get('/api/session', (req, res) => {
  assistant
    .session()
    .then(sessionid => res.send(sessionid))
    .catch(err => handleError(res, err));
});


/**
 * Get a list of resources
 *
 * The query string may contain the following qualifiers:
 * 
 * - type
 * - name
 * - id
 *
 * A list of resource objects will be returned (which can be an empty list)
 */
app.get('/api/resource', (req, res) => {
  const type = req.query.type;
  const name = req.query.name;
  const id = req.query.id;

  cloudant
    .find(type, name, id)
    .then(data => {
      if (data.statusCode != 200) {
        res.sendStatus(data.statusCode)
      } else {
        res.send(data.data)
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Create a Premise entry in Cloudant
 *
 * The body must contain:
 * 
 * - Name
 * - Type
 * - Latitude
 * - Longitude
 * - Max Limit
 * - Current Strength 
 * The body may also contain:
 * 
 * - Description
 * - Address
 * 
 * The ID and rev of the resource will be returned if successful
 */
let types = ["mall", "restaurant", "park"]
app.post('/api/add', (req, res) => {
  if (!req.body.type) {
    return res.status(422).json({ errors: "Type of item must be provided"});
  }
  if (!types.includes(req.body.type)) {
    return res.status(422).json({ errors: "Type of item must be one of " + types.toString()});
  }
  if (!req.body.name) {
    return res.status(422).json({ errors: "Name of item must be provided"});
  }
  if (!req.body.latitude) {
    return res.status(422).json({ errors: "Latitude must be provided"});
  }
  if (!req.body.longitude) {
    return res.status(422).json({ errors: "Longitude must be provided"});
  }
  if (!req.body.maxLimit) {
    return res.status(422).json({ errors: "Maximum Limit must be provided"});
  }
  if (!req.body.currentStrength) {
    return res.status(422).json({ errors: "Current Strength must be provided"});
  }
  const type = req.body.type;
  const name = req.body.name;
  const description = req.body.description || '';
  const latitude = req.body.latitude || '';
  const longitude = req.body.longitude || 1;
  const maxLimit = req.body.maxLimit || '';
  const currentStrength = req.body.currentStrength;

  cloudant
    .create(type, name, description, latitude, longitude, maxLimit, currentStrength)
    .then(data => {
      if (data.statusCode != 201) {
        res.sendStatus(data.statusCode)
      } else {
        res.send(data.data)
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Update current strength for existing premise id
 * 
 * The new rev of the resource will be returned if successful
 */
app.post('/api/update/:id', (req, res) => {

  if (!req.body.gatetype) {
    return res.status(422).json({ errors: "Gate type must be provided"});
  }
  if (!req.body.totalguests) {
    return res.status(422).json({ errors: "Current Strength must be provided"});
  }

  const gateType = req.body.gatetype || '';
  var totalGuests = req.body.totalguests || '';
   
   if(gateType == 'entry') 
	   totalGuests = parseInt(totalGuests);
   else
	   totalGuests = 0 - parseInt(totalGuests);
     
  cloudant
    .update(req.params.id, totalGuests)
    .then(data => {
      if (data.statusCode != 200) {
        res.sendStatus(data.statusCode)
      } else {
        res.send(data.data)
      }
    })
    .catch(err => handleError(res, err));
});

const server = app.listen(port, () => {
    const host = server.address().address;
   const port = server.address().port;
   console.log(`=== ALPHA server listening at http://${host}:${port}`);

});
