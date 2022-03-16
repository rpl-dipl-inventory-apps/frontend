import LayoutFront from 'components/LayoutFront';
import About from 'pages/home/default/components/About';
import Hero from 'pages/home/default/components/Hero';
import Team from 'pages/home/default/components/Team';

const Home = () => {
    return (
        <LayoutFront>
            <Hero />
            <About />
            <Team />
        </LayoutFront>
    );
};

export default Home;
