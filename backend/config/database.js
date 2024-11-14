import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/jobportal")
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDatabase;
