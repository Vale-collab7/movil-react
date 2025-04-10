const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let db;

async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "3212407062",
      database: "users_db",
    });

    console.log(" Conectado a MySQL");
  } catch (error) {
    console.error("Error al conectar a MySQL:", error);
  }
}

// Ruta para insertar usuario
app.post("/users", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name) {
    return res.status(400).json({ error: "El nombre es requerido" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone]
    );

    res.status(201).json({ message: "Usuario creado", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const [users] = await db.execute("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    await db.execute(
      "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?",
      [name, email, phone, id]
    );
    res.json({ message: "Usuario actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Iniciar servidor después de conectar a la BD
connectDB().then(() => {
  app.listen(3000, () => {
    console.log(" Servidor corriendo en http://localhost:3000");
  });
});
