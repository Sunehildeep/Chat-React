// Controller: users
const query = require('../config/db');

// Get conversations
exports.getConversationsList = async (req, res, next) => {
    try {
        const id = req.params.id;
        const results = await query('SELECT c.user1, c.user2, c.id, u.name AS name, u.avatar, c.last_message AS last_message FROM conversations c INNER JOIN users u ON c.user2 = u.id \
      WHERE c.user1 = ? UNION SELECT c.user1, c.user2, c.id, u.name AS name, u.avatar, c.last_message AS last_message FROM conversations c INNER JOIN users u ON c.user1 = u.id WHERE c.user2 = ? ORDER BY id DESC', [id, id]);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const results = await query('SELECT avatar, name, id as userId FROM users');
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

        // Update last message in conversations table
        await query('UPDATE conversations SET last_message = ? WHERE id = ?', [message, id]);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

exports.startConvo = async (req, res, next) => {
    try {
        const { user1, user2, message } = req.body;
        const results = await query('INSERT INTO conversations (user1, user2, initiator, last_message) VALUES (?, ?, ?, ?)', [user1, user2, user1, message]);
        const convoId = results.insertId;
        res.status(200).json(convoId);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}