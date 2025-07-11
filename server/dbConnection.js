const mongoose = require("mongoose");

 mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => console.log("DB CONNECTED!"))
	.catch((e) => console.log(e));


