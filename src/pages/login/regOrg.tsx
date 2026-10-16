import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { authServices } from "../../api/auth";
import { useState } from "react";
import { useRegStore } from "../../store/authStore";
import Icon from "../../components/common/Icon";
import Header from "../../components/common/header";
import AtomDemo from "../../components/common/loader";
import { NavLink, useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const orgRegSchema = z.object({
    name: z.string().min(2, 'Organization name must be at least 2 characters'),
    headquartersState: z.string().min(3, 'Enter a valid city'),
})
type orgRegType = z.infer<typeof orgRegSchema>;

function OrganizationRegister() {
    const setregacc = useRegStore((state) => state.setRegacc)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<orgRegType>({
        resolver: zodResolver(orgRegSchema),
        defaultValues: {
            name: '',
            headquartersState: '',
        }
    })
    const onSubmit: SubmitHandler<orgRegType> = async (data) => {
        setIsLoading(true)
        try {
            const response = await authServices.postRegisterOrganization({
                name: data.name,
                headquarters_city: data.headquartersState,
            })

            setregacc(response);
            navigate('/register')
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
            <main className="w-full h-screen font-family flex items-center justify-center bg-[#F1F5F9]">
                <div className="flex flex-col max-w-[500px] w-full space-y-4 rounded shadow-lg p-10 bg-white">
                    <div className="flex justify-center">
                        <Icon />
                    </div>

                    <div className="text-center space-y-2">
                        <h1 className="font-bold">Register Organization</h1>
                        <p className="text-[14px] text-[#64748B]">Smart Food-Waste Management System — Register your organization to get started.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="flex flex-col space-y-2">
                            <label className="font-bold uppercase text-[12px]">Organization Name</label>
                            <input
                                className="px-4 text-[12px] text-[#64748B] py-2 rounded-sm ring ring-[#CBD5E1]"
                                placeholder="Enter organization name"
                                {...register('name')}
                            />
                            {errors.name && <p className="text-red-500 text-[12px]">{errors.name.message}</p>}

                            <label className="font-bold uppercase text-[12px]">Headquarters City</label>
                            <input
                                className="px-4 text-[12px] text-[#64748B] py-2 rounded-sm ring ring-[#CBD5E1]"
                                placeholder="Enter headquarters city"
                                {...register('headquartersState')}
                            />
                            {errors.headquartersState && <p className="text-red-500 text-[12px]">{errors.headquartersState.message}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-4 bg-[#2E7D32] rounded-lg text-[14px] ring text-white"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <AtomDemo /> : <>Register Organization <FaArrowRight size={10} /></>}
                            </button>
                        </div>

                        <div>
                            <p className="text-center font-medium text-[#64748B] text-[12px]">Already have an account? <NavLink className={'text-[#2E7D32]'} to={'/login'}>log in to branch</NavLink></p>
                        </div>
                    </form>
                </div>
            </main>
        </section>
    )
}
export default OrganizationRegister;