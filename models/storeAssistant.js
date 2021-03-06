const mongoose = require("mongoose")

//schema for store assistant
const storeAssistantSchema = new mongoose.Schema({
	name: { type: String, required: true},
	phone_number: { type: String, required: true },
	email: { type: String,},
	password: { type: String, default: "password" },
	store_id: {type: String},
	is_active: { type: Boolean, default: 1 },
	user_role: { type: String, default: "store_assistant" }
}, { timestamp: true });

module.exports = mongoose.model("storeAssistant", storeAssistantSchema);