import z from "zod"
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import Icon from "../components/common/Icon";
import { authServices } from "../api/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useAuthStore, useRegStore } from "../store/authStore";
import { useNavigate, NavLink } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import AtomDemo from "../components/common/loader";
import Header from "../components/common/header";

// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const registerSchema = z.object({
    chain: z.string().optional(),
    name: z.string().min(2, 'Branch name must be up to 3 or more characters'),
    city: z.string().min(3, 'City name must be at least 3 characters'),
    state: z.string().min(3, 'State name must be at least 3 characters'),
    address: z.string().min(5, 'Address requires at least 5 characters').max(100, 'Address limits to 100 characters').trim(),
    is_pilot_intervention: z.boolean(),
    has_standby_generator: z.boolean(),
    is_active: z.boolean(),
})

type registerForm = z.infer<typeof registerSchema>
function Register() {
    const setUser = useAuthStore((state) => state.setUser)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const regacc = useRegStore((state) => state.regacc)
    const {
        register, handleSubmit, setValue, formState: { errors, isSubmitting }
    } = useForm<registerForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            chain: regacc?.chain || (regacc as any)?.id || '',
            name: '',
            city: '',
            state: '',
            address: '',
            is_pilot_intervention: false,
            has_standby_generator: false,
            is_active: true,
        }
    })

    useEffect(() => {
        const chainId = regacc?.chain || (regacc as any)?.id;
        if (chainId) {
            setValue('chain', chainId);
        }
    }, [regacc, setValue]);

    const onSubmit: SubmitHandler<registerForm> = async (data) => {
        setIsLoading(true);
        const chainId = regacc?.chain || (regacc as any)?.id || data.chain;
        if (!chainId) {
            toast.error('No organization chain found. Please register an organization first.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await authServices.postRegisterAccount({
                chain: chainId,
                name: data.name,
                city: data.city.toUpperCase(),
                state: data.state.toUpperCase(),
                address: data.address,
                is_pilot_intervention: data.is_pilot_intervention,
                has_standby_generator: data.has_standby_generator,
                is_active: data.is_active,
            })
            setUser(response)
             navigate('/login')
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
                    Object.entries(errors).forEach(([field, messages]) => {
                        toast.error(`${field}: ${messages[0]}`)
                    })
                }
            }
        } finally {
            setIsLoading(false)

        }
    }
    return (
        <section className="w-full h-screen font-family flex flex-col justify-center">
            <Header />
            <main className="w-full h-screen font-family  flex items-center justify-center">
                <div className="flex flex-col max-w-[600px] space-y-4 rounded shadow-lg p-10">
                    <div className=" flex justify-center">
                        <Icon />
                    </div>

                    <div className="text-center">
                        <h1 className="font-bold">Create Account</h1>
                        <p className="text-[14px] text-[#64748B]">Smart Food-Waste Management System - Enterprise Onboarding.
                            Join your team to start tracking and cutting food waste.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-5">

                        <div className="grid gap-4 grid-cols-2">
                            <div className="flex flex-col space-y-2">
                                <label className="font-bold uppercase text-[12px]">Branch Name</label>
                                <input className=" px-4 text-[12px] text-[#64748B] py-2 rounded-sm ring ring-[#CBD5E1]" placeholder="Enter branch name" {...register('name')} />
                                {errors.name && <p className="text-red-500 text-[12px]">{errors.name.message}</p>}

                                <label className="font-bold uppercase text-[12px]">City</label>
                                <input className=" px-4 text-[12px] text-[#64748B] py-2 rounded-sm ring ring-[#CBD5E1]" placeholder="Enter city" {...register('city')} />
                                {errors.city && <p className="text-red-500 text-[12px]">{errors.city.message}</p>}
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label className="font-bold uppercase text-[12px]">State</label>
                                <input className=" px-4 text-[12px] text-[#64748B] py-2 rounded-sm ring ring-[#CBD5E1]" placeholder="Enter state" {...register('state')} />
                                {errors.state && <p className="text-red-500 text-[12px]">{errors.state.message}</p>}

                                <label className="font-bold uppercase text-[12px]">Address</label>
                                <input className="px-4 text-[12px] text-[#64748B] py-2 rounded-sm ring ring-[#CBD5E1]" placeholder="Enter address" {...register('address')} />
                                {errors.address && <p className="text-red-500 text-[12px]">{errors.address.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-3 text-[12px]">
                            <div className="flex flex-row gap-2 items-center">
                                <input type="checkbox" {...register('is_pilot_intervention')} />
                                <label className="text-[#64748B]">Pilot Intervention Site</label>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <input type="checkbox" {...register('has_standby_generator')} />
                                <label className="text-[#64748B]">Has Standby Generator</label>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <input type="checkbox" defaultChecked {...register('is_active')} />
                                <label className="text-[#64748B]">Active Branch</label>
                            </div>
                        </div>

                        <div className="flex flex-row gap-2 text-[12px] items-center">
                            <input className="mb-4" type="checkbox" />
                            <p className="text-[#64748B]">I agree to the <NavLink to={'/'} className={'text-[#2E7D32]'}>Enterprise Data Handling & Privacy Policy</NavLink> and consent to system telemetry
                                monitoring for waste compliance audits.</p>
                        </div>

                        <div>
                            <button type="submit" className=" w-full flex items-center justify-center gap-2 px-4 py-2 mt-8 bg-[#2E7D32] rounded-lg text-[14px] ring text-white" disabled={isSubmitting}>{isSubmitting ? <AtomDemo /> : <> Register <FaArrowRight size={10} /></>}
                            </button>
                        </div>

                        <div>
                            <p className="text-center font-medium text-[#64748B] text-[12px]">Already have an account? <NavLink className={'text-[#2E7D32]'} to={'/'}>Sign In</NavLink></p>
                        </div>
                    </form>


                </div>
            </main>
        </section>
    )
}
export default Register;