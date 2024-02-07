import { useState } from 'react';

function AddProduct() {

	const initialFormData = {
		name: '',
		description: '',
		price: 0,
		tax: 0
	};

	const [formData, setFormData] = useState(initialFormData);
	const [responseText, setResponseText] = useState("Results will go here");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		// Check if the "Name" field is empty
		if (!formData.name.trim()) {
			alert("Name cannot be empty. Please fill in the name field.");
			return; // Do not proceed with the form submission
		}

		// Make a POST request to the specified endpoint
		try {
			const response = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/items/`, {
				method: 'POST',
				headers: {
					'accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				console.log('Item updated successfully!');
				const data = await response.json();
				console.log(data);
				setResponseText(JSON.stringify(data)); // Convert the data to a string
				setFormData(initialFormData);
			} else {
				console.error('Failed to update item.');
				setResponseText('Failed to update Item');
			}
		} catch (error) {
			console.error('Error:', error);
			setResponseText('Error occurred');
		}
	};

	return (
		<form className="element" onSubmit={handleFormSubmit}>
			<h2>Add Product:</h2>
			<label>
				Name:
				<input type="text" name="name" value={formData.name} onChange={handleChange} />
			</label>
			<br />
			<label>
				Description:
				<input type="text" name="description" value={formData.description} onChange={handleChange} />
			</label>
			<br />
			<label>
				Price:
				<input type="number" name="price" value={formData.price} onChange={handleChange} />
			</label>
			<br />
			<label>
				Tax:
				<input type="number" name="tax" value={formData.tax} onChange={handleChange} />
			</label>
			<br />
			<button type="submit">Submit</button>
			<div id="response">{responseText}</div>
		</form>
	)
}

export default AddProduct;