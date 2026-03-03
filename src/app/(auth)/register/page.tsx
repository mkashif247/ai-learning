import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { Header } from '@/shared/components/layout/Header';

export default function RegisterPage(): React.ReactNode {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <div className="pt-16">
        <RegisterForm />
      </div>
    </div>
  );
}
