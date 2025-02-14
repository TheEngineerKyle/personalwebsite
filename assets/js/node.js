const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());

const SECRET_KEY = "6LeIa9cqAAAAAJHSudqyQpd8z1OBAFLvxd4-KS6dERE"; // Replace with your actual reCAPTCHA secret key

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

// Serve the file securely after CAPTCHA validation
app.get('/download-resume', (req, res) => {
	const filePath = path.join(__dirname, 'images', 'resume.pdf'); // Ensure this is the correct file path
	res.download(filePath);
});

app.listen(3000, () => console.log('Server running on port 3000'));
