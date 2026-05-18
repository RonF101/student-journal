import AuthModal from '@/Components/AuthModal';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Login() {
    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
        router.visit('/');
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            <div className="space-y-5">
                <div className="border border-[var(--fyi-border)] bg-[var(--fyi-surface)] p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fyi-text-secondary)]">
                        Member Access
                    </p>
                    <h1 className="mt-2 font-serif text-3xl font-black leading-tight text-[var(--fyi-text)]">
                        Sign in to The FYI
                    </h1>
                    <p className="mt-1 text-sm text-[var(--fyi-text-secondary)]">
                        Continue to your role dashboard, saved articles, submissions, and editorial tools.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="w-full border px-4 py-2.5 text-sm font-serif font-bold transition"
                    style={{
                        borderColor: 'var(--fyi-primary)',
                        backgroundColor: 'var(--fyi-primary)',
                        color: 'var(--fyi-background)',
                    }}
                >
                    Open Sign In
                </button>

                <div
                    className="flex items-center justify-between border-t pt-4 text-xs font-mono uppercase tracking-[0.16em]"
                    style={{ borderColor: 'var(--fyi-border)' }}
                >
                    <Link href="/" className="underline" style={{ color: 'var(--fyi-text-secondary)' }}>
                        Back Home
                    </Link>
                    <Link href={route('register')} className="underline" style={{ color: 'var(--fyi-text-secondary)' }}>
                        Create Account
                    </Link>
                </div>
            </div>

            <AuthModal isOpen={isOpen} onClose={closeModal} initialMode="login" />
        </GuestLayout>
    );
}
