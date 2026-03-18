'use client'
import LoginForm from '@/components/SinginPages/LoginForm/LoginForm';
import css from './loginPage.module.css'

export default function LoginPage() {
return (
    <div className={css.page}>
        <LoginForm/>
    </div>
)
}