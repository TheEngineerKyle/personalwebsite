const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());

const SECRET_KEY = "6LeIa9cqAAAAAJHSudqyQpd8z1OBAFLvxd4-KS6dE"; // Replace with actual secret key

// Verify reCAPTCHA
app.post('/verify-captcha', async (req, res) => {
	const { token } = req.body;

	try {
		const response = await axios.post(
			'https://www.google.com/recaptcha/api/siteverify',
			new URLSearchParams({ secret: SECRET_KEY, response: token })
		);

		if (response.data.success) {
			res.json({ success: true });
		} else {
			res.json({ success: false });
		}
	} catch (error) {
		res.status(500).json({ error: 'Verification failed' });
	}
});

// Serve the file after CAPTCHA verification
app.get('/download-file', (req, res) => {
	const filePath = path.join(__dirname, 'yourfile.pdf'); // Change to your file path
	res.download(filePath);
});

app.listen(3000, () => console.log('Server running on port 3000'));
