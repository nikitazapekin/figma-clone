import React, { useState } from "react";
import { SignUpConsts } from "@/mocks/SignInForm";
import styles from "./SignUpForm.module.scss";
import AuthFormField from "@/features/AuthFormField/AuthFormField";
import AuthCarousel from "@/features/AuthCarousel/AuthCarousel";
import Image from "next/image";
import Google from "@/assets/google.png";
import ActionButton from "@/shared/ActionButton/ActionButton";
import Link from "next/link";
import { FormData } from "@/shared/types/FormData";
import { SignUpApi } from "@/services/auth";
import { useRouter } from "next/router";

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter()
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await SignUpApi(formData);
      if (response.code == 201) {
        router.push(`/SignIn`)
      }
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Произошла неизвестная ошибка.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className={styles.form__container}>
        <div className={styles.form__info}>
          <AuthCarousel />
        </div>
        <div className={styles.form__auth}>
          <div className={styles.form__auth__content}>
            <h1 className={styles.form__title}>Добро пожаловать</h1>
            <h3 className={styles.form__describtion}>
              Авторизуйтесь в нашем приложении для пользования
            </h3>
            <div className={styles.form__fields}>
              {SignUpConsts.map((item) => (
                <AuthFormField
                  key={item.title}
                  title={item.title}
                  placeholder={item.placeholder}
                  field={item.field}
                  handleInputChange={handleInputChange}
                />
              ))}
            </div>
            {loading ? (
              <p>Загрузка...</p>
            ) : (
              <ActionButton
                link="#"
                text="Зарегистрироваться"
                handleSubmit={handleSubmit}
              />
            )}
            {error && <p className={styles.form__error}>{error}</p>}
            {successMessage && <p className={styles.form__success}>{successMessage}</p>}
            <p className={styles.form__or}>Или</p>
            <div className={styles.form__google}>
              <Image src={Google} className={styles.form__google__image} alt="Google" />
            </div>
            <p className={styles.form__or}>
              <Link href={`/SignIn`} className={styles.form__link}>
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
