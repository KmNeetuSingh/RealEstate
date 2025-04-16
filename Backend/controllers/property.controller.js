const Property = require("../models/Property");

const createProperty = async (req, res) => {
  try {
    const property = await Property.create({ ...req.body, owner: req.user.id });
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: "Property creation failed", error: err.message });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("owner", "name email");
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};

module.exports = { createProperty, getAllProperties };
