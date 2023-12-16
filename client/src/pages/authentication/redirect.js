import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../userContest'; // 
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useParams } from 'react-router-dom';
const defaultTheme = createTheme();

export default function PatientRegister() {
	const navigate = useNavigate();
	const { setUserId, setUserRole } = useUser();
	const { token } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				//const token = sessionStorage.getItem('authorization');
				console.log("token: ", token);
				const response = await axios.post('http://localhost:8001/auth/redirect',{"authorization":token});
				const { userId, userRole } = response.data;
				console.log("redirect.js");
				console.log(userId, userRole);
				setUserId(userId);
				setUserRole(userRole);

				navigate('/patient/cart');
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<ThemeProvider theme={defaultTheme}>

		</ThemeProvider>
	);
}
