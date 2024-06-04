import { useState, useRef } from "react";
import { signup,login} from "./api/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/slice/authSlice";

export default function Form({ onToggleSignIn, showSignIn }) {
    const [signin, setSignin] = useState(true);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const cpasswordRef = useRef(null);
    const dispatch= useDispatch()

    const handlesignup = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const cpassword = cpasswordRef.current.value;

        if (password !== cpassword) {
            console.error("Passwords do not match");
            return;
        }

        const userData = { email, password,cpassword};
        try {
            const data = await signup(userData);
            if(data.state===true && data.message){
                setSignin(!signin)
                toast.success(data.message)
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    const handlesignin = async(event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (!password || !email) {
           toast.error("Fill required filleds");
            return;
        }
        const userData = { email, password};
        try {
            const data = await login(userData);
            if (data.state === true) {
                toast.success(data.message)
                dispatch(setCredentials({ userInfo: data.userData }))
                if(showSignIn){
                    onToggleSignIn()
                }
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };
    return (
        <>
            <div className="bg-slate-900 lg:p-64 h-screen flex flex-col justify-center items-center">
                <div className="w-full h-full flex items-center justify-center lg:px-20">
                    {signin ? (
                        <div className="w-full mx-auto p-5 border border-gray-300 bg-gray-100">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Sign in to your account
                                </h2>
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" onSubmit={handlesignin}>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                ref={emailRef}
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                ref={passwordRef}
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>

                                <p className="mt-10 text-center text-sm text-gray-500">
                                    Not a member?{' '}
                                    <button onClick={() => setSignin(false)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                        Sign up
                                    </button>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full mx-auto p-5 border border-gray-300 bg-gray-100">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Create new account
                                </h2>
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                    <form className="space-y-6" onSubmit={handlesignup}>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                    ref={emailRef}
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                    ref={passwordRef}
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Confirm Password
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                ref={cpasswordRef}
                                                id="cpassword"
                                                name="cpassword"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>

                                    <p className="mt-10 text-center text-sm text-gray-500">
                                        Already a member?{' '}
                                        <button onClick={() => setSignin(true)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                            Sign in
                                        </button>
                                    </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}