import { useState } from 'react';

function GetProduct() {

	const initialGetFormData = {
		id: 0,
	}

	const [idData, setIdData] = useState(initialGetFormData);
	const [resultsText, setResultsText] = useState("Get Results");

	const handleIDChange = (e) => {
		const { name, value } = e.target;
		setIdData({
			...idData,
			[name]: value
		});
	};

	// Get id
	const handleGetFormSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('http://192.168.0.2:8000/items/' + idData.id, {
				method: 'GET',
				headers: {
					'accept': 'application/json',
					'Content-Type': 'application/json'
				},
			});
			if (response.ok) {
				const data = await response.json();
				console.log(JSON.stringify(data));
				setResultsText(JSON.stringify(data)); // Convert the data to a string
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<form className="element" onSubmit={handleGetFormSubmit}>
			<h2>Get Product:</h2>
			<label>
				ID:
				<input type="number" name="id" value={idData.id} onChange={handleIDChange} />
				<br />
				<button type="submit">Search</button>
			</label>
			<div id="response">{resultsText}</div>
		</form>
	);
}

export default GetProduct;