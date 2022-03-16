import aboutImgPng from 'assets/about_img.png';

const About = () => {
    return (
        <div
            className="container mx-auto flex px-4 w-full flex-col mt-20 md:mt-64 relative z-10"
            id="about"
        >
            <div className="flex justify-center w-full">
                <p className="text-xl text-theme-orange-500 font-bold">
                    About Us
                </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center w-full">
                <div className="w-full md:w-1/2 flex justify-center">
                    <img src={aboutImgPng} alt="About" />
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center flex-col">
                    <div className="my-5">
                        <p className="text-xl font-bold">
                            Bring inventory app accross the world
                        </p>
                    </div>
                    <div className="my-5 px2 md:px-20">
                        <p className="leading-10">
                            Karomz Inventory is an inventory
                            application that will store your products
                            with safe and sound storing management!
                            This application will give you the
                            convinience of managing your products
                            efficiently as you can access it wherever
                            and whenever you are!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
