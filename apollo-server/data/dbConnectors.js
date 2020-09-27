import Sequelize from 'sequelize';
import _ from 'lodash';
import casual from 'casual';

// SQL 
const sequelize = new Sequelize('database', null, null, {
    dialect: 'sqlite',
    storage: './friends.sqlite',
});

const Friends = sequelize.define('friends', {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    gender: { type: Sequelize.STRING },
    age: { type: Sequelize.INTEGER },
    language: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    contacts: { type: Sequelize.STRING },
});

Friends.sync({ force: true }).then(() => {
    _.times(10, (i) => {
        Friends.create({
            firstName: casual.first_name,
            lastName: casual.last_name,
            gender: "FEMALE" ,
            age: casual._day_of_month,
            language: casual.word,
            email: casual.word ,  
        });
    });
});

export { Friends };
