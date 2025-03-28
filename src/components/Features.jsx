import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon,link }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20 text-white" />
            <a className="relative z-20 text-white" href={link}>Register</a>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  const textRefs = useRef([]);

  useEffect(() => {
    textRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section className="bg-black pb-52" >
      <div className="text-white text-center font-robert-medium text-4xl pt-40 lg:flex lg:flex-row-reverse  gap-10 mx-10">
        <div>
          <h1 ref={(el) => (textRefs.current[0] = el)}>MISSION</h1>
          <ul
            ref={(el) => (textRefs.current[1] = el)}
            className="text-justify text-xl list-disc pl-6"
          >
            <li>
              To provide the needed resources and infrastructure and to establish a conducive ambience for the teaching-learning and research processes and to meet with the technological developments.
            </li>
            <li>
              To create high quality professionals and entrepreneurs in the field of Electronics and Communication Engineering with the right attitude to serve the society with ethical values.
            </li>
            <li>
              To modernize the laboratories on par with industry standards and to collaborate with them to improve the skill set of the students for providing innovative solutions to the industry.
            </li>
          </ul>
        </div>
        <img src="img/RMKlogo.png" alt="" className="hidden lg:block" />
        <div className=" lg:hidden flex items-center justify-center">
          <img src="img/RMKlogo.png" alt=""  />
        </div>
        <div>
          <h1 ref={(el) => (textRefs.current[2] = el)}>VISION</h1>
          <ul
            ref={(el) => (textRefs.current[3] = el)}
            className="text-justify text-xl list-disc pl-6"
          >
            <li>
              To be one of the most sought after Centres of Excellence in the field of Electronics and Communication Engineering by providing high quality education.
            </li>
            <li>
              To mould the students to compete internationally and to become excellent researchers and innovators who can provide solution to societal issues.
            </li>
          </ul>
        </div>
      </div>
      <img src="img/Rules.jpg" alt="" className="h-auto w-auto p-12"/>
      <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32 ">
        <p className="font-circular-web text-3xl text-blue-50">
            Following for the exciting events!
        </p>
        <p className="max-w-md font-circular-web text-2xl text-blue-50 opacity-50">
          Discover the symposium, where a diverse range of products come together to create a unique and interconnected experience in your world.
        </p>
      </div>
      <br id="events"/>
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[75vh]" >
        <BentoCard
          src="videos/Tech_Thesis_video.mp4"
          title={
            <>
              <b>Tech Thesis<br />Paper presentation</b> 
            </>
          }
          // description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          isComingSoon
          link="https://docs.google.com/forms/d/e/1FAIpQLSe8xVvli13AiUlFe0GLVi_BBWBeRx3wGfwn-pQmgVjGgKxlpQ/viewform"
        />
      </BentoTilt>

      <div className="grid h-[110vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <Link to="/about">
          <BentoCard
            src="videos/Ideathon_video.mp4"
            title={
              <>
              </>
              // <>
              //   Id<b>e</b>ath<b>o</b>n 
              //   <br />
              //   Project Presentation
              // </>
            }
            // description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            isComingSoon
            link="https://docs.google.com/forms/d/e/1FAIpQLSe8O3JRIITp0e9_KjZcKhdx_zqkDJfhQoXZSliEhEEQJXyKWQ/viewform?usp=header"
          />
          </Link>
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                <b> Tech Trek </b>
                <p className="text-lg pl-1.5">Quiz Event</p>
              </>
            }
            // description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            isComingSoon
            link="https://docs.google.com/forms/d/e/1FAIpQLSdGVpALobqqKn"

          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                Robo Trail<br/> Blaze <br></br>
                <p className="text-xl">line following robot</p>
                <p className="text-xl">Event</p>
              </>
            }
            // description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            isComingSoon
            link="https://docs.google.com/forms/d/e/1FAIpQLSdGllvvI3Qv6_chCTNXR14S1z0Qo8fPw3ngrLWxEs7cP-Y46g/viewform?usp=header"
          />
        </BentoTilt>
        {/* <BentoTilt className="bento-tilt_2">
          <BentoCard
            src="videos/feature-5.mp4"
            title={
              <>
                <b>IOBOS</b>
              </>
            }
            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            isComingSoon
          />
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt> */}
        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              S<b>U</b>pr<b>is</b>e E<b>v</b>ents co<b>m</b>ing s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        
      </div>
    </div>
    </section>
  );
};

export default Features;
