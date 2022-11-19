const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const MDBConnection = async (app) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.MONGODB_NAME,
    });
    console.log("Database connection successfully");
    app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

function appInit(app) {
  MDBConnection(app);
}
module.exports = appInit;
