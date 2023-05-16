import React, {useState, useEffect} from "react";
import styled from "styled-components";

interface Slide {
    img: string;
    text: string;
}

interface SliderProps {
    slides: Slide[];
    loop?: boolean;
    navs?: boolean;
    pages?: boolean;
    auto?: boolean;
    stopMouseHover?: boolean;
    delay?: number;
}

const SliderContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`;

const SliderImage = styled.img`
  width: 100%;
  height: auto;
`;

const SliderText = styled.div`
  position: absolute;
  bottom: 3em;
  left: 14em;
  font-size: 18px;
  color: white;
\`        ;
`;
const NumberImage = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 20px;
  color: white;
\`       ;
`;


const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 45%;
  font-size: 40px;
  color: white;
`;

const PrevArrow = styled(ArrowButton)`
  left: 10px;
`;

const NextArrow = styled(ArrowButton)`
  right: 10px;
`;


const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const PaginationDot = styled.button<{ active: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  margin: 0 5px;
  background-color: ${(props) => (props.active ? "black" : "gray")};
  cursor: pointer;
`;

const Slider: React.FC<SliderProps> = ({
                                           slides,
                                           loop = false,
                                           navs = false,
                                           pages = false,
                                           auto = false,
                                           stopMouseHover = false,
                                           delay = 3,
                                       }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoEnabled, setIsAutoEnabled] = useState(auto);

    const totalSlides = slides.length;

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isAutoEnabled) {
            interval = setInterval(() => handleSlideChange(1), delay * 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [currentIndex, isAutoEnabled, delay]);

    const handleSlideChange = (delta: number) => {
        const nextIndex = (currentIndex + delta + slides.length) % slides.length;
        setCurrentIndex(nextIndex);
    };

    const handlePagination = (index: number) => {
        setCurrentIndex(index);
    };

    const handleMouseEnter = () => {
        if (auto) {
            setIsAutoEnabled(false);
        }
    };

    const handleMouseLeave = () => {
        if (auto) {
            setIsAutoEnabled(true);
        }
    };

    const renderNavButtons = () => {
        return (
            <>
                <PrevArrow onClick={() => handleSlideChange(-1)}>&#x2190;</PrevArrow>
                <NextArrow onClick={() => handleSlideChange(1)}>&#x2192;</NextArrow>
            </>
        );
    };

    const renderPaginationDots = () => {
        return (
            <PaginationContainer>
                {slides.map((_, index) => (
                    <PaginationDot
                        key={index}
                        active={index === currentIndex}
                        onClick={() => handlePagination(index)}
                    />
                ))}
            </PaginationContainer>
        );
    };

    return (
        <SliderContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {navs && renderNavButtons()}
            {slides.map((slide, index) => (
                <div key={index} style={{display: index === currentIndex ? "block" : "none"}}>
                    <SliderImage src={slide.img} alt={`Slide ${index + 1}`} />
                    <SliderText>{slide.text}</SliderText>
                </div>
            ))}

            {pages && renderPaginationDots()}

            <NumberImage>
                {currentIndex + 1}/{slides.length}
            </NumberImage>
        </SliderContainer>
    );
};

export default Slider;


