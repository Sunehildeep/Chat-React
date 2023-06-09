// Controller: users
const query = require('../config/db');

// Get conversations
exports.getConversationsList = async (req, res, next) => {
    try {
        const id = req.params.id;
        const results = await query('SELECT c.id, u.name AS name, u.avatar, c.last_message AS last_message FROM conversations c INNER JOIN users u ON c.user2 = u.id \
      WHERE c.user1 = ? UNION SELECT c.id, u.name AS name, u.avatar, c.last_message AS last_message FROM conversations c INNER JOIN users u ON c.user1 = u.id WHERE c.user2 = ?', [id, id]);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const results = await query('SELECT * FROM users');
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

exports.getConversationHistory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const results = await query('SELECT uc.id, uc.time, uc.message, uc.sender, u.name FROM user_conversations uc JOIN users u ON uc.sender = u.id WHERE uc.id = ? ORDER BY uc.time ASC', [id]);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

exports.postMessage = async (req, res, next) => {
    try {
        const { id, sender, message } = req.body;
        const results = await query('INSERT INTO user_conversations (id, sender, message) VALUES (?, ?, ?)', [id, sender, message]);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}