import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
  const { auth } = usePage().props;

  return (
    <>
      <Head title="Dashboard" />
      <main className="min-h-screen bg-[#f5efe4] px-6 py-12 text-[#191714]">
        <section className="mx-auto max-w-3xl rounded-lg border border-[#d8cbb8] bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#9b6a2f]">
            Student Journal
          </p>
          <h1 className="mt-3 text-3xl font-bold">Welcome{auth?.user?.name ? `, ${auth.user.name}` : ''}</h1>
          <p className="mt-4 text-base leading-7 text-[#5f5a51]">
            Your account is active, but a role-specific dashboard was not found yet. Try opening the
            student dashboard, or sign out and sign back in after deployment finishes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={route('student.dashboard')}
              className="rounded-md bg-[#191714] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3a332a]"
            >
              Open Student Dashboard
            </Link>
            <Link
              href={route('logout')}
              method="post"
              as="button"
              className="rounded-md border border-[#c7b8a2] px-5 py-3 text-sm font-semibold text-[#191714] transition hover:bg-[#efe4d2]"
            >
              Sign Out
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
