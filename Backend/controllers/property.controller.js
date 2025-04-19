const Property = require("../models/Property");

// Create Property
const createProperty = async (req, res) => {
  try {
    const property = await Property.create({ ...req.body, owner: req.user.id });
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: "Property creation failed", error: err.message });
  }
};

// Get All Properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("owner", "name email");
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};

// Delete Property by ID
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Optional: Check if current user is the owner or admin
    if (property.owner.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this property" });
    }

    await property.deleteOne();
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete property", error: err.message });
  }
};

module.exports = { createProperty, getAllProperties, deleteProperty };
