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
