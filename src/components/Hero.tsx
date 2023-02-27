import styled from "styled-components";

const Hero = () => {
  return (
    <HeroWrapper className='section-center'>
      <article>
        <HeroMessage />
      </article>
    </HeroWrapper>
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

const HeroWrapper = styled.section`
  min-height: 60vh;
`;
export default Hero;
