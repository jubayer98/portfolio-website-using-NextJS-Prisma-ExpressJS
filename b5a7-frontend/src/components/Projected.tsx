'use client';
import { isAuthed } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Protected({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (!isAuthed()) {
            router.replace('/login');
        } else {
            setOk(true);
        }
    }, [router]);

    if (!ok) return <div className="p-6 text-sm text-gray-500">Checking access...</div>;
    return <>{children}</>;
}
