'use client';
import css from './LoginForm.module.css';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    return (
        <div className={css.loginForm}>
                <button className={css.closeBtn} onClick={() => router.back()}>X</button>
                <h1 className={css.title}>Log In</h1>
                <p className={css.text}>Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.</p>
                <form className={css.form}>
                    <input className={css.input} type="email" placeholder="Email" />
                    <input className={css.input} type="password" placeholder="Password" />
                    <button className={css.loginBtn} type="submit">Log In</button>
                </form>
        </div>
    )
}
