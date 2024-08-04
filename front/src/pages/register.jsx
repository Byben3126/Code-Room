import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { register as registerAPI } from '../api';
import { useAuth } from '../context/AuthContext'; 

function register() {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [password2,setPassword2] = useState("")
    const [accepTherme,setAccepTherme] = useState(false)

    const [error,setError] = useState("")
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            setError('Les mots de passe doivent etre identique')
            return
        }

        if (!accepTherme) {
            setError("Veuillez a accepter les therme d'utilisation")
            return
        }
        try {
          const credentials = { email: username, password };
          const {status, data} = await registerAPI(credentials);
          if (status == 200) {
            navigate('/login');
            return
          }
         
        } catch (err) {}
        setError("E-mail existe deja !")
    };

    return (
        <section class="bg-beige dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-brown md:text-2xl">
                            Création de votre compte
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-brown">Email</label>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} type="email" name="email" id="email" class="bg-beige border border-gray-300 text-brown text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-brown">Mot de passe</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-beige border border-gray-300 text-brown text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label for="confirm-password" class="block mb-2 text-sm font-medium text-brown">Confirmation mot de passe</label>
                                <input value={password2} onChange={(e) => setPassword2(e.target.value)} type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-beige border border-gray-300 text-brown text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input value={accepTherme} onChange={(e) => setAccepTherme(e.target.value)} id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-beige focus:ring-3 focus:ring-primary-300 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="terms" class="font-light text-brown">j'accepte <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">les conditions d'utilisation</a></label>
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="ml-3 text-sm">
                                        <label for="remember" class="text-red">{error}</label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                            <p class="text-sm font-light text-brown">
                                Vous avez deja un compte ? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => navigate('/login')}>Se connecter</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default register