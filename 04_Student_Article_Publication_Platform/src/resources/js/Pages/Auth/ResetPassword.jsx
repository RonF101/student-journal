import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (event) => {
        event.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="space-y-5">
                <div className="border border-[var(--fyi-border)] bg-[var(--fyi-surface)] p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fyi-text-secondary)]">
                        Account Recovery
                    </p>
                    <h1 className="mt-2 font-serif text-3xl font-black leading-tight text-[var(--fyi-text)]">
                        Create a new password
                    </h1>
                    <p className="mt-1 text-sm text-[var(--fyi-text-secondary)]">
                        Choose a strong password you have not used before.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="email" className="text-sm font-medium text-[var(--fyi-text)]">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={(event) => setData('email', event.target.value)}
                            className="block w-full border border-[var(--fyi-border)] bg-[var(--fyi-background)] px-3 py-2.5 text-sm text-[var(--fyi-text)]"
                            required
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="space-y-1">
                            <label htmlFor="password" className="text-sm font-medium text-[var(--fyi-text)]">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(event) => setData('password', event.target.value)}
                                className="block w-full border border-[var(--fyi-border)] bg-[var(--fyi-background)] px-3 py-2.5 text-sm text-[var(--fyi-text)]"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="password_confirmation" className="text-sm font-medium text-[var(--fyi-text)]">
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(event) => setData('password_confirmation', event.target.value)}
                                className="block w-full border border-[var(--fyi-border)] bg-[var(--fyi-background)] px-3 py-2.5 text-sm text-[var(--fyi-text)]"
                                required
                            />
                        </div>
                    </div>

                    {(errors.password || errors.password_confirmation) && (
                        <InputError message={errors.password || errors.password_confirmation} className="mt-1" />
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full border px-4 py-2.5 text-sm font-serif font-bold"
                        style={{
                            borderColor: 'var(--fyi-primary)',
                            backgroundColor: 'var(--fyi-primary)',
                            color: 'var(--fyi-background)',
                        }}
                    >
                        {processing ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
}
