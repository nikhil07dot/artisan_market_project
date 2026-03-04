import UserAction from '../models/UserAction.js';

export const getAllActions = async (req, res) => {
  try {
    const actions = await UserAction.find().sort({ timestamp: -1 });
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user actions", error: err });
  }
}; 

export const getTopWishlisted = async (req, res) => {
  try {
    const actions = await UserAction.aggregate([
      { $match: { action: "Added to Wishlist" } },
      { $group: { _id: "$product", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch wishlist stats", error: err });
  }
};

export const getTopCarted = async (req, res) => {
  try {
    const actions = await UserAction.aggregate([
      { $match: { action: "Added to Cart" } },
      { $group: { _id: "$product", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart stats", error: err });
  }
};
