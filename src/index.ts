import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';

const app = express();
app.use(express.json());

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "test_db",
  entities: [User,Post],
  synchronize: true,
});

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initializeDatabase = async () => {
  await wait(20000);
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};

initializeDatabase();

app.post('/users', async (req, res) => {
// Crie o endpoint de users
  const user:User = req.body
  const inUse = await AppDataSource.getRepository(User).find({where: {email: user.email}})

  if (inUse) {
    res.status(409).send("Email já em uso!")
    return
  }

    res.status(201).send(user)
    return

  try {
    await AppDataSource.getRepository(User).create({firstName: user.firstName, lastName: user.lastName, email: user.email})
    res.sendStatus(201)
  } catch (error) {
    res.sendStatus(500)
  }

});

app.post('/posts', async (req, res) => {
// Crie o endpoint de posts
const post:Post = req.body
const user = await AppDataSource.getRepository(User).find({where: {id: post.userId}})

if (!user) {
  res.status(404).send("Usuário não cadastrado!")
  return
}

try {
  await AppDataSource.getRepository(Post).create({title: post.title, description: post.description, userId: post.userId})
  res.sendStatus(201)
} catch (error) {
  res.sendStatus(500)
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
