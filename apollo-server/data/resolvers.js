import { Friends } from './dbConnectors';
import { PubSub, withFilter } from 'graphql-subscriptions';


const pubsub = new PubSub();

export const resolvers = {
    Query: {
        getOneFriend: (root, { id }) => {

            return Friends.find({
                where: {
                  id: id
                }
              })
        },
        getFriends: () => {
            return Friends.findAll();
        }
    },
    Mutation: {
        createFriend: (root, { input }) => {
            
            pubsub.publish("friendAdded", {friendAdded: input});
            return Friends.create({
                firstName: input.firstName,
                lastName: input.lastName,
                gender: input.gender,
                age: input.age,
                language: input.language,
                email: input.email,
                contacts: input.contacts
            }
            );

        },
        updateFriend: (root, { input }) => {

            return Friends.upsert({
                firstName: input.firstName,
                lastName: input.lastName,
                gender: input.gender,
                age: input.age,
                language: input.language,
                email: input.email,
                contacts: input.contacts
            });
        },
        deleteFriend: (root, { id }) => {

            return Friends.destroy({
                where: {
                    id: id
                  }
            });
        },
    },
    Subscription: {
        friendAdded: {
            subscribe: () => pubsub.asyncIterator('friendAdded'),
        }
    },
};
