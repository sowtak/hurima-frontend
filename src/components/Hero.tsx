
const Hero = () => {
  return (
    <section className='section-center'>
      <article>
        <HeroMessage />
      </article>
    </section>
  );
};

const HeroMessage = () => {
  return (
    <>
      <h1>
        Join our community of sellers and buyers at Hurima <br />
        You'll find great deals, meet new people,
        <br />
        and discover unique products!
      </h1>
      <p>
        Decor, Clothing, Accessories, Electronics, Toys,
        <br />
        Sports equipment, Handmade products, Beauty, <br />
        Pet supplies and so on.
      </p>
    </>
  );
};
export default Hero;
