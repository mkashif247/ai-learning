import { LoginForm } from '@/features/auth/components/LoginForm';
import { Header } from '@/shared/components/layout/Header';

export default function LoginPage(): React.ReactNode {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <div className="pt-16">
        <LoginForm />
      </div>
    </div>
  );
}
