const express = require('express');
const router = express.Router();
const Service = require('../models/service');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get services by type
router.get('/type/:type', async (req, res) => {
  try {
    const services = await Service.find({ type: req.params.type });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get nearby services (using MongoDB geospatial queries)
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lon, maxDistance = 5000, type } = req.query; // maxDistance in meters
    
    const query = {
      coordinates: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lon), parseFloat(lat)] // Note: MongoDB uses [longitude, latitude]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    };
    
    if (type) {
      query.type = type;
    }
    
    const services = await Service.find(query);
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new service
router.post('/', async (req, res) => {
  const service = new Service({
    name: req.body.name,
    type: req.body.type,
    coordinates: req.body.coordinates,
    address: req.body.address,
    phone: req.body.phone,
    website: req.body.website
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;