import sql from '../db/index.js';


export const getUsers = async (req, res) => {
    try {
        const users = await sql`SELECT * FROM "User"`;
        console.log('Usuarios obtenidos:', users);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const [newUser] = await sql`
      INSERT INTO "User" (name, email)
      VALUES (${name}, ${email})
      RETURNING *
    `;
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
