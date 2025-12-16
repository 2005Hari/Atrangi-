const db = require('./db');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        await db.connect();

        const users = [
            { name: 'Admin User', email: 'admin@atrangi.com', role: 'admin' },
            { name: 'Creative Head', email: 'creative@atrangi.com', role: 'creative_head' },
            { name: 'Content Team', email: 'content@atrangi.com', role: 'content_team' },
            { name: 'Marketing & EM', email: 'marketing@atrangi.com', role: 'marketing_em' }
        ];

        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 8);

        for (const user of users) {
            const existingUser = await db.users.findOne({ email: user.email });
            if (!existingUser) {
                await db.users.insertMany([{
                    name: user.name,
                    email: user.email,
                    password: hashedPassword,
                    role: user.role,
                    avatar: `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`,
                    createdAt: new Date()
                }]);
                console.log(`Created ${user.role}: ${user.email}`);
            } else {
                console.log(`${user.role} already exists.`);
            }
        }
        console.log("Seeding complete.");
        process.exit(0);
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedAdmin();
