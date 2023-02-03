import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Chirp from '@/Components/Chirp';

export default function Index({auth, chirps}) {
    const {data, setData, post, processing, reset, errors, } = useForm(
        {
            message: '',
        }
    );


    const submit = e => {
        post(route("chirps.store", {
            onSuccess: () => {
                reset();
            }
        }))
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title='Chirps'/>
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea className="w-full border-gray-300 focus:border-indigo-300 rounded-md  focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm" placeholder="What's in your mind?" value={data.message} onChange={e => setData({...data, message: e.target.value})}></textarea>
                    <InputError message={errors.message} className = "mt-2"/>
                    <PrimaryButton className='mt-4' processing={processing}>Chirp</PrimaryButton>
                </form>
            </div>
            <div>
                {chirps?.map(chirp => {
                    return <Chirp chirp={chirp}/>
                })}
            </div>

        </AuthenticatedLayout>
    )
}
