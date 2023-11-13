import { buildSchema } from 'graphql';
import { addResolversToSchema } from '@graphql-tools/schema';
import { User } from './entity/User';
import { Task } from './entity/Task';
import { AppDataSource } from './data-source';



export const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    tasks: [Task]
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    user: User!
    completed: Boolean!
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    createTask(title: String!, description: String!, userId: ID!): Task
    updateTask(id: ID!, title: String, description: String, completed: Boolean): Task
    deleteTask(id: ID!): Task
    markTaskAsCompleted(id: ID!): Task
  }
`;

export const resolvers = {
  Query: {
    tasks: async () => {
      const tasks = await AppDataSource.getRepository(Task).find({ relations: ['user'] });
      return tasks;
    },
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      const userRepository = AppDataSource.getRepository(User);
      const user = userRepository.create({ name, email });
      return userRepository.save(user);
    },
    createTask: async (_, { title, description, completed, userId }) => {
      // const user = await AppDataSource.getRepository(User).findOne(userId );
      const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });

      if (!user) {
        console.error('User not found with userId:', userId);
        throw new Error('User not found');
      }
    
      if (!user) throw new Error('User not found');

      const taskRepository = AppDataSource.getRepository(Task);
      const task = taskRepository.create({ title, description, completed: false, user });
      return taskRepository.save(task);
    },
    updateTask: async (_, { id, title, description, completed }) => {
      const task = await AppDataSource.getRepository(Task).findOne(id);
      if (!task) throw new Error('Task not found');
      if (title) task.title = title;
      if (description) task.description = description;
      if (completed !== undefined) task.completed = completed;
      return AppDataSource.getRepository(Task).save(task);
    },
    deleteTask: async (_, { id }) => {
      const task = await AppDataSource.getRepository(Task).findOne(id);
      if (!task) throw new Error('Task not found');
      await AppDataSource.getRepository(Task).remove(task);
      return task;
    },
    markTaskAsCompleted: async (_, { id }) => {
      const task = await AppDataSource.getRepository(Task).findOne(id);
      if (!task) throw new Error('Task not found');
      task.completed = true;
      return AppDataSource.getRepository(Task).save(task);
    },
  },
};

const schema = buildSchema(typeDefs);

 const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});





export default schemaWithResolvers;
