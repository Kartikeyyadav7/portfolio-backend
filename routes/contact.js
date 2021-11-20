const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/contact", async (req, res) => {
	try {
		const { name, email, messageMail } = req.body;

		const transporter = nodemailer.createTransport({
			port: 465,
			host: "smtp.gmail.com",
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD,
			},
			secure: true,
		});

		let message = {
			from: {
				name: `${name}`,
				address: `${email}`,
			},
			to: "kartikeyyadav.13579@gmail.com",
			subject: `Portfolio received message from ${name}`,
			text: `${messageMail}`,
			html: `
                <h3>You received email from ${email}</h3>
                <p>${messageMail}</p>
            `,
		};

		await transporter.sendMail(message, (error, info) => {
			if (error) {
				console.log(error);
				res.json("error");
			} else {
				console.log(info);
				res.status(200).json("Email sent");
			}
		});
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
