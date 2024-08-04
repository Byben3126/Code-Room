import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from '../api';
import { useAuth } from '../context/AuthContext'; 

function Login() {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate();

    const { login } = useAuth();



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const credentials = { username, password };
          const {status, data} = await loginAPI(credentials);
          if (status == 200) {
            login(data)
            navigate('/');
            return
          }
         
        } catch (err) {}
        setError("Password/username incorect")
    };

    return (
        <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-brown md:text-2xl">
                        Sign in to your account
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-brown">Your email</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="email" name="email" id="email" class="bg-beige border border-gray-300 text-brown rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""/>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-brown">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-beige border border-gray-300 text-brown rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-red">{error}</label>
                                </div>
                            </div>
                            <a href="#" class="text-sm font-medium text-brown hover:underline">Mot de passe oublié?</a>
                        </div>
                        <button type="submit" class="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Se connecter</button>
                        <p class="text-sm font-light text-brown">
                            Tu n'as pas de compte? <a href="#" class="font-medium text-brown hover:underline" onClick={()=>navigate('/register')}>S'inscrire</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>
    )
}

export default Login