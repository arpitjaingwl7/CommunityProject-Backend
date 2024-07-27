import mongoose from "mongoose";

async function connect(){
    return await mongoose.connect(process.env.MONGO_DBURI)
}

export default connect;