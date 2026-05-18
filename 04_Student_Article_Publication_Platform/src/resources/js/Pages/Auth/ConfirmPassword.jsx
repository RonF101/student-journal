import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (event) => {
        event.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="space-y-5">
                <div className="border border-[var(--fyi-border)] bg-[var(--fyi-surface)] p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fyi-text-secondary)]">
                        Security Check
                    </p>
                    <h1 className="mt-2 font-serif text-3xl font-black leading-tight text-[var(--fyi-text)]">
                        Confirm your password
                    </h1>
                    <p className="mt-1 text-sm text-[var(--fyi-text-secondary)]">
                        This protected action needs your password before you continue.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="password" className="text-sm font-medium text-[var(--fyi-text)]">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(event) => setData('password', event.target.value)}
                            className="block w-full border border-[var(--fyi-border)] bg-[var(--fyi-background)] px-3 py-2.5 text-sm text-[var(--fyi-text)]"
                            required
                            autoFocus
                        />
                        <InputError message={errors.password} className="mt-1" />
                    </div>

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
                        {processing ? 'Confirming...' : 'Confirm Password'}
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
}
