import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log("MongoDB connected with server");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDatabase;
