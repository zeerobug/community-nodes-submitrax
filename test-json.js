const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

const Form = sequelize.define('Form', {
    settings: {
        type: DataTypes.JSON,
        defaultValue: { webhooks: [] }
    }
});

async function run() {
    await sequelize.sync();
    const form = await Form.create({});
    
    // Simulate what the route does
    const settings = form.settings || {};
    const webhooks = settings.webhooks || [];
    
    webhooks.push({ url: 'http://test.com' });
    settings.webhooks = webhooks;
    
    form.changed('settings', true);
    await form.save();
    
    // Fetch from db to see if it saved
    const fetched = await Form.findByPk(form.id);
    console.log("FETCHED:", JSON.stringify(fetched.settings));
}

run();
