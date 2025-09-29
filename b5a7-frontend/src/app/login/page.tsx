/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Min 6 chars'),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: FormData) => {
        try {
            await api.login(data);
            toast.success('Logged in');
            router.push('/dashboard');
            router.refresh();
        } catch (e: any) {
            toast.error(e.message || 'Login failed');
        }
    };

    return (
        <div className="mx-auto max-w-sm rounded-2xl border bg-white p-6 shadow-sm">
            <h1 className="mb-4 text-2xl font-bold">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input className="mt-1 w-full rounded-md border p-2" type="email" {...register('email')} />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input className="mt-1 w-full rounded-md border p-2" type="password" {...register('password')} />
                    {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
                </div>
                <button disabled={isSubmitting} className="mt-2 w-full rounded-md bg-gray-900 p-2 text-white disabled:opacity-60">
                    {isSubmitting ? 'Please wait...' : 'Login'}
                </button>
            </form>
            <p className="mt-3 text-xs text-gray-500">Use your admin credentials.</p>
        </div>
    );
}
