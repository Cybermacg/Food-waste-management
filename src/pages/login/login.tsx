import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Icon from "../../components/common/Icon";
import { authServices } from "../../api/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink } from "react-router";
import Loader from "../../components/common/loader";
import Header from "../../components/common/header";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const loginSchema = z.object({
    username: z.string().min(4, "Username must be at least 4 characters"),
    password: z
        .string()
        .regex(
            passwordRegex,
            "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one symbol"
        ),
});
type loginFormData = z.infer<typeof loginSchema>;

function Login() {
    const [isLoading, setIsloading] = useState(false)
    const {
        register, handleSubmit, formState: { errors, isSubmitting },
    } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<loginFormData> = async (data) => {
        setIsloading(true)
        try {
            const response = await authServices.postLoginAccount({
                username: data.username,
                password: data.password,
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    toast.error('Network Error, Please check you internet connection')
                } else if (error.response.status === 401) {
                    toast.error('Invalid username or password.')
                } else if (error.response.status === 404) {
                    toast.error('Account not found.')
                } else if (error.response.status === 500) {
                    toast.error("Error connecting, don't worry it's not your fault")
                } else {
                    const errors = error.response.data as Record<string, string[]>
                    Object.entries(errors).forEach(([field, message]) => {
                        toast.error(`${field}, ${message}`)
                    })
                }
            }
        } finally {
            setIsloading(false)
        }
    }
    return (
        <section className="flex flex-col w-full h-screen ">
            <Header />
            <main className="h-screen font-primary bg-[#F1F5F9] justify-center shadow-sm w-full flex flex-col items-center">
                <div className=" p-5 space-y-4 ring ring-[#E2E8F0] rounded-sm bg-white">
                    <div className="items-center justify-center flex">
                        <Icon />
                    </div>
                    <div className="text-center space-y-2">
                        <h1 className="font-bold">Food Waste Manager</h1>
                        <p className="text-[14px] text-[#64748B]">AI-Driven Food Waste Reduction System</p>
                    </div>
                    <form className="flex space-y-1  flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <label className="text-[14px] text-[#64748B]">Username</label>
                        <input className="w-96 px-4 py-2 rounded-sm ring ring-[#CBD5E1]" placeholder="Enter username" {...register("username")} />
                        {errors.username && <p className="text-red-500">{errors.username.message || "Username is not valid"}</p>}

                        <label className="text-[14px] text-[#64748B]">Password</label>
                        <input className="w-96 px-4 py-2 rounded-sm ring ring-[#CBD5E1]" type="password" placeholder="Enter Password" {...register('password')} />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        <button className="w-96 flex items-center justify-center px-4 py-2 mt-8 bg-[#2E7D32] rounded-sm ring text-white" disabled={isSubmitting}>{isSubmitting ? <Loader /> : 'Login'}</button>
                        <div>
                            <p className="text-[12px] text-center text-[#64748B]">You don't have an account yet? click here to <NavLink to={'/'} className={'font-bold text-[#2E7D32]'}>Register</NavLink></p>
                        </div>
                    </form>
                </div>
            </main>
        </section>
    )
}
export default Login