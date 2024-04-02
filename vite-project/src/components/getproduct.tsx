import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

import { Card, CardTitle, CardContent, CardDescription, CardFooter, CardHeader } from './ui/card';
  

function GetProduct() {

	const initialGetFormData = {
		id: 0,
	}

	const [idData, setIdData] = useState(initialGetFormData);
	const [resultsText, setResultsText] = useState("Results: ");

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
			const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/items/` + idData.id, {
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
		<Card>
			<CardHeader>
				<CardTitle>Get Product</CardTitle>
				<CardDescription>Use the Products ID to retreive it's details</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="flex w-full max-w-sm items-center space-x-2" onSubmit={handleGetFormSubmit}>
					<Input type="number" name="id" placeholder="ID Number" value={idData.id} onChange={handleIDChange} />
					<Button type="submit">Search</Button>
				</form>
			</CardContent>
			<CardFooter>
				{resultsText}
			</CardFooter>
		</Card>
	);
}

export default GetProduct;