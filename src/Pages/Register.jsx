import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    
    async function handleRegister(values) {
        setIsLoading(true);
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
            if (data.message === 'success') {
                alert("مبروك! الحساب اتعمل بنجاح، روحي لصفحة الـ Login");
                navigate('/login'); 
            }
        } catch (err) {
            setError(err.response.data.message); 
        }
        setIsLoading(false);
    }

    
    function getFormValues(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let user = Object.fromEntries(formData.entries());
        
       
        if (user.password !== user.rePassword) {
            setError("Passwords do not match!");
            return;
        }
        handleRegister(user);
    }

    return (
        <div className="container py-5 w-50 mx-auto">
            <h2 className="fw-bold mb-4">Register Now</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={getFormValues}>
                <label>Name:</label>
                <input className="form-control mb-2" name="name" type="text" required />

                <label>Email:</label>
                <input className="form-control mb-2" name="email" type="email" required />

                <label>Password:</label>
                <input className="form-control mb-2" name="password" type="password" required />

                <label>Confirm Password:</label>
                <input className="form-control mb-2" name="rePassword" type="password" required />

                <label>Phone:</label>
                <input className="form-control mb-3" name="phone" type="tel" required />

                <button type="submit" className="btn bg-main text-white">
                    {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
                </button>
            </form>
        </div>
    );
}