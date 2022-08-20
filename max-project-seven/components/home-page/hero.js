import Image from 'next/image'
import classes from './hero.module.css'

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image 
          src="/images/site/ayanesh.jpg" 
          alt="An image showing Ayanesh" 
          width={302} 
          height={302} 
        />
      </div>
      <h1>Hi, I'm Ayanesh</h1>
      <p>I aspire to be a writer, especially on Fantasy and Sci-Fi genre.</p>
    </section>
  )
}

export default Hero