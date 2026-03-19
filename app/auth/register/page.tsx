'use client'
import css from './registerPage.module.css'
import RegistrationForm from '@/components/SinginPages/RegistrationForm/RegistrationForm';

export default function RegisterPage() {
return (
    <div className={css.page}>
        <RegistrationForm/>
    </div>
)
}

