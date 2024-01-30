import { useState } from 'react';

function ClickMe() {
	const [buttonText, setButtonText] = useState('Click Me');
	const [buttonStyle, setButtonStyle] = useState({ backgroundColor: '#3498db' });

	const handleClick = () => {
		console.log('Button clicked!');
		setButtonText('Clicked!');
		setButtonStyle({ backgroundColor: 'red' });

		// Set a timeout to change the text back to "Click Me" after 5 seconds
		setTimeout(() => {
			setButtonText('Click Me');
			setButtonStyle({ backgroundColor: '#3498db' });
		}, 1000);
	};

	return <button onClick={handleClick} style={buttonStyle}>{buttonText}</button>;
}

export default ClickMe;