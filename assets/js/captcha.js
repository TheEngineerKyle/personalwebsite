grecaptcha.render(containerElement, {
	sitekey: 'your_site_key',
	theme: 'light', // or 'dark'
	size: 'normal', // or 'compact'
	tabindex: 3,
	callback: verifyResponse, // optional callback function
	'expired-callback': handleExpiredToken, // optional callback function
	'error-callback': handleRenderError // optional callback function
});




	function submitForm(ev) {
		ev.preventDefault();
	grecaptcha.ready(function() {
		grecaptcha.execute('reCAPTCHA_site_key', { action: 'submit' }).then(function (token) {
			// Submit the form to your backend server here
		});
      });
    }



// Add the following function to your server-side code
function verifyResponse(token) {
	fetch('https://www.google.com/recaptcha/api/siteverify', {
		method: 'POST',
		body: JSON.stringify({
			secret: "your-secret-key",
			response: "the token received from the callback function",
			remoteip: "the user's IP address" // optional
		})
	})
		.then(response => response.json())
		.then(data => {
			/**
			The data object looks like the following:
				{
				  "success": true|false,
				  "challenge_ts": timestamp,  // timestamp when the challenge was loaded (ISO format)
				  "hostname": string,         // the hostname of the site where the reCAPTCHA verification was done
				  "error-codes": [...]        // optional
				}
			**/
			if (data.success) {
				// User is legitimate, proceed with form submission or other actions.
			} else {
				// Handle invalid token case, display error message to user.
			}
		});
}
