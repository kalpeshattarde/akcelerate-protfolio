import LoginInteractive from './components/LoginInteractive';

export const metadata = {
  title: 'Login - LuxeFashion',
  description: 'Sign in to your LuxeFashion account to access exclusive collections, manage orders, and enjoy personalized shopping experience.',
};

export default function LoginPage() {
  const pageData = {
    title: 'Sign In',
    subtitle: 'Access your account to continue your luxury fashion journey'
  };

  return <LoginInteractive pageData={pageData} />;
}