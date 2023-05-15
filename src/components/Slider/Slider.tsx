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
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const SliderImage = styled.img`
  width: 100%;
  height: auto;
`;

const SliderText = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  font-size: 18px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
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
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  margin: 0 5px;
  background-color: ${(props) => (props.active ? "red" : "gray")};
  cursor: pointer;
`;

const Slider: React.FC<SliderProps> = ({
                                           slides,
                                           loop = false,
                                           navs = false,
                                           pages = false,
                                           auto = false,
                                           stopMouseHover = false,
                                           delay = 5,
                                       }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoEnabled, setIsAutoEnabled] = useState(auto);

    const totalSlides = slides.length;

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isAutoEnabled) {
            interval = setInterval(() => {
                handleNext();
            }, delay * 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [currentIndex, isAutoEnabled]);

    const handleNext = () => {
        const nextIndex = currentIndex + 1;

        if (loop) {
            setCurrentIndex(nextIndex >= totalSlides ? 0 : nextIndex);
        } else {
            setCurrentIndex(nextIndex < totalSlides ? nextIndex : currentIndex);
        }
    };

    const handlePrev = () => {
        const prevIndex = currentIndex - 1;

        if (loop) {
            setCurrentIndex(prevIndex < 0 ? totalSlides - 1 : prevIndex);
        } else {
            setCurrentIndex(prevIndex >= 0 ? prevIndex : currentIndex);
        }
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
        if (auto && !stopMouseHover) {
            setIsAutoEnabled(true);
        }
    };

    const renderNavButtons = () => {
        return (
            <>
                <PrevArrow onClick={handlePrev}>
                    <img
                        width="30" height="30" src="https://img.icons8.com/officel/80/less-than.png" alt="Arrow next"
                    />
                </PrevArrow>
                <NextArrow onClick={handleNext}>
                    <img
                        width="30" height="30" src="https://img.icons8.com/officel/80/more-than.png"
                        alt="Arrow previous"
                    />
                </NextArrow>
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

            <div>
                {currentIndex + 1}/{slides.length}
            </div>

            {auto && stopMouseHover && (
                <p>Hover over the slider to pause auto mode</p>
            )}
        </SliderContainer>
    );
};

export default Slider;


