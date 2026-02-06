import "dotenv/config"; 

console.log("SERVER FILE EXECUTING");

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import cloudinary from "./src/config/cloudinary.js";

const PORT = process.env.PORT || 500;

cloudinary.api
  .ping()
  .then(() => console.log("✅ Cloudinary connected"))
  .catch(err => console.error("❌ Cloudinary error:", err));

const startServer = async () => {
  try {
    await connectDB();
    console.log("DB connected, starting server...");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1);
  }
};
console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY?.slice(0, 6));



startServer();
