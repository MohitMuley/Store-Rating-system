const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
require('./utils/db'); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
