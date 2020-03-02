const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getCategoryById = async (req, res) => {
	try {
		const position = await Position.find({
			category: req.params.categoryId,
			user: req.user.id
		});
		res.status(200).json(position);
	} catch (error) {
		errorHandler(res, error);
	}
};
module.exports.create = async (req, res) => {
	try {
		const position = await Position.find({
			name: req.body.name,
			cost: req.body.cost,
			category: req.body.category,
			user: req.user.id
		}).save();
		res.status(200).json(position);
	} catch (error) {
		errorHandler(res, error);
	}
};

module.exports.remove = async (req, res) => {
	try {
		await Position.remove({ _id: req.params.id });
		res.status(200).json({ message: 'position was removed' });
	} catch (error) {
		errorHandler(res, error);
	}
};

module.exports.update = async (req, res) => {
	try {
		const position = await Position.findOneAndUpdate(
			{
				_id: req.params.id
			},
			{
				$set: req.body
			},
			{
				new: true
			}
		);
		res.status(200).json(position);
	} catch (error) {
		errorHandler(res, error);
	}
};
