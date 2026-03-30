
import mongoose from "mongoose" ;

const userActivitySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    event:  { type: String, required: true },
    metadata: { type: Object, default: {} },
    url: { type: String },
    timestamp: { type: Date, default: Date.now }
}) ;

const userActivityModel = mongoose.models.userActivityModel || mongoose.model("userActivity", userActivitySchema) ;

export default userActivityModel ;