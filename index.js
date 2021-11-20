const express = require("express");
const app = express();
const contact = require("./routes/contact");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/", contact);

app.get("/", (req, res) => {
	res.send("Welcome to the backend");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}`);
});
