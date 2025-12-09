import sql from '../db/index.js';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await sql`SELECT * FROM "User"`;
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un usuario
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

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [user] = await sql`SELECT * FROM "User" WHERE id = ${id}`;
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const [updatedUser] = await sql`
      UPDATE "User"
      SET name = ${name}, email = ${email}, "updatedAt" = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

        if (!updatedUser) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [deletedUser] = await sql`
      DELETE FROM "User"
      WHERE id = ${id}
      RETURNING *
    `;
        if (!deletedUser) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado', user: deletedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
