import { useEffect, useRef, useState } from "react";
import { data } from '@/lib/carrousel-images';
import '../styles/img-carrousel.css'



export function ImgCarrousel() {

    const listRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const listNode = listRef.current;
        const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

        if (imgNode) {
            imgNode.scrollIntoView({
                behavior: "smooth"
            })
        }
    }, [currentIndex]);

    const scrollToImage = (direction) => {
        console.log(currentIndex)
        if(direction ==='prev') {
            setCurrentIndex(curr => {
                const isFirstSlide = currentIndex === 0;
                return isFirstSlide ? 0 : curr - 1;
            })
        } else {
            const isLastSlide = currentIndex === data.length - 1;
            if (!isLastSlide) {
                setCurrentIndex(curr => curr + 1);
            }
        }
    }

    const goToSlide = (i) => {
        setCurrentIndex(i);
    }

    return (
        <div className="carrousel-container">
        <div className="main-container">
            <svg onClick={() => scrollToImage('prev')} width="28" height="63" viewBox="0 0 28 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="23.3344" y1="62.0829" x2="1.28936" y2="29.4176" stroke="#0045AC" strokeWidth="3" />
                <line x1="26.5234" y1="1.32616" x2="1.13996" y2="31.4705" stroke="#0045AC" strokeWidth="3" />
            </svg>
            <div style={{
                width: '70%',
                height: '100%'
            }}>
                <div className="slider-container">
                    <div className="container-img">
                        <ul className="carrousel" style={{ padding: 0 }} ref={listRef}>
                            {
                                data.map((item) => {
                                    return <li className="carrousel-element" key={item.id}>
                                        <img src={item.imgUrl} width={500}></img>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <svg onClick={() => scrollToImage('next')} width="28" height="63" viewBox="0 0 28 63" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
                <line x1="23.3344" y1="62.0829" x2="1.28936" y2="29.4176" stroke="#0045AC" strokeWidth="3" />
                <line x1="26.5234" y1="1.32616" x2="1.13996" y2="31.4705" stroke="#0045AC" strokeWidth="3" />
            </svg>
        </div>
        <div className="dots-container">
            {
                data.map((_, i) => (
                    <svg className={`dot`} key={i} onClick={() => {goToSlide(i)}} width={`${i === currentIndex ? "12" : "10"}`} height={`${i === currentIndex ? "12" : "10"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill={`${i === currentIndex ? "#808080" : "#a4a9b2"}`} d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>
                ))
            }
        </div>
        </div>
    )
}
