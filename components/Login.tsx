"use client"

import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { login } from "@/server/session"
import { useState } from "react"

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

type FormFields = z.infer<typeof schema>

const Login = () => {

    const [isLogging, setIsLogging] = useState(false);
    const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm<FormFields>({
        resolver: zodResolver(schema)
    })

    const router = useRouter();

    const onSubmit : SubmitHandler<FormFields> = async (data) => {
        try {
            const tryLogin = await login(data);
            if(!tryLogin.success) {
                setError("root", {
                    message: "Email or passwrod incorrect"
                })
                setIsLogging(true);
            } else {
                router.push("/products");
            }
            
        } catch(error) {
            setError("root", {
                message: `Something went wrong, please try again!: ${error}`
            })
        }
    }

    return (
        <>
            <div className="min-h-dvh flex justify-center items-center bg-lightMainBg dark:bg-darkMainBg transition-all duration-300">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-3/4 md:w-2/4 lg:w-1/3 bg-lightScreenBg dark:bg-darkScreenBg rounded-xl p-8 shadow-md dark:shadow-darkKey2Bg/20"
                >
                    {errors.root?.message && <span className="block text-xs text-center text-red-600 mb-1.5">{errors.root.message}</span>}
                    <div className="flex flex-col">
                        <h2 className="mb-5 text-4xl text-center font-bold text-lightTextColor1 dark:text-darkKey2Shadow">Login</h2>
                        <div className="mb-3">
                            <input {...register("email")} type="email" placeholder="Email" className="w-full px-3 py-1.5 rounded-sm dark:bg-darkMainBg dark:text-darkTextColor1" />
                            {errors.email?.message && <span className="block text-xs text-right text-red-600 dark:text-darkTextColor1 mt-1.5">{errors.email.message}</span>}
                        </div>
                        <div className="mb-3">
                            <input {...register("password")} type="password" placeholder="Password" className="w-full px-3 py-1.5 rounded-sm dark:bg-darkMainBg dark:text-darkTextColor1" />
                            {errors.password?.message && <span className="block text-xs text-right text-red-600 dark:text-darkTextColor1 mt-1.5">{errors.password.message}</span>}
                        </div>
                        <div className="mt-4">
                            {!isSubmitting || !isLogging ?
                                <button type="submit" className="block w-full font-semibold bg-lightKey2Bg text-white hover:bg-lightKey2Shadow dark:bg-darkKey1Shadow dark:hover:bg-darkKey1Bg px-4 py-2 rounded-sm transition-colors duration-200">
                                    Login
                                </button>
                                :
                                <button type="submit" disabled className="block w-full font-semibold bg-lightKey2Bg text-white hover:bg-lightKey2Shadow dark:bg-darkKey1Shadow dark:hover:bg-darkKey1Bg px-4 py-2 rounded-sm transition-colors duration-200">
                                    Loading...
                                </button>
                            }
                            <a href="#" className="block w-full text-center mt-2 underline hover:no-underline text-lightTextColor1 dark:text-darkKey2Shadow">Register</a>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login