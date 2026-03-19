import Image from "next/image";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className="container">
        <div className={css.heroContainer}>
        <div className={css.left}>
          <h1 className={css.title}>
            The road to the <span className={css.span}>depths</span> of the
            human soul
          </h1>
          <p className={css.text}>
            We help you to reveal your potential, overcome challenges 
            <br/>and find a guide in your own life with the help of our 
            <br/>experienced psychologists.
          </p>
          <button className={css.heroBtn}>Get started</button>
        </div>
        <div className={css.right}>
          <Image
            className={css.heroImg}
            src="/image/image-2.png"
            alt="Hero Image"
            width={464}
            height={526}
          />
          <div className={css.card}>
            <div className={css.check}>✔</div>
            <div className={css.wraper}>
              <p className={css.cardTitle}>Experienced psychologists</p>
              <h3 className={css.count}>15,000</h3>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
