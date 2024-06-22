import React, { useState, useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import "./RangeSlider.css";

const RangeSlider = () => {
  const [rangeValue, setRangeValue] = useState(64);
  const [currentY, setCurrentY] = useState((480 * 64) / 100);
  const [mouseDy, setMouseDy] = useState(0);
  const [lastMouseDy, setLastMouseDy] = useState(0);
  const rangeWrapperRef = useRef(null);
  const rangeValuesRef = useRef(null);
  const rangeSliderPathsRef = useRef([]);

  const max = 100;
  const rangeMin = 0;
  const rangeMax = 100;
  const rangeHeight = 480;
  const mouseDyLimit = 150;
  const mouseDyFactor = 3;
  const scaleMax = 0.32;

  useEffect(() => {
    updateValue();
  }, [currentY]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = rangeValue < max ? rangeValue + 1 : rangeValue;
      setRangeValue(newValue);
      setCurrentY((rangeHeight * newValue) / max);
    }, 1000); // 1000ミリ秒 = 1秒

    return () => clearInterval(interval);
  }, [rangeValue]); // rangeValueが変更されたときに実行

  const buildPath = (dy, ty) => {
    return `M 0 ${ty} q 0 ${dy} 320 0 l 0 480 l -320 0 Z`;
  };

  const updateValue = () => {
    const scale = ((rangeValue - rangeMin) / (rangeMax - rangeMin)) * scaleMax;
    rangeValuesRef.current.style.transform = `translateY(${
      rangeHeight - currentY
    }px)`;
    rangeValuesRef.current.children[0].children[0].style.transform = `scale(${
      1 - scale
    })`;
    rangeValuesRef.current.children[1].children[0].style.transform = `scale(${
      1 - (scaleMax - scale)
    })`;

    if (Math.abs(mouseDy) < mouseDyLimit) {
      setLastMouseDy(mouseDy);
    } else {
      setLastMouseDy(mouseDy < 0 ? -mouseDyLimit : mouseDyLimit);
    }

    let newSliderY = currentY + lastMouseDy / mouseDyFactor;
    newSliderY = Math.max(
      (rangeHeight * rangeMin) / max,
      Math.min(newSliderY, (rangeHeight * rangeMax) / max)
    );

    const newPath = buildPath(lastMouseDy, rangeHeight - newSliderY);
    rangeSliderPathsRef.current.forEach((path) =>
      path.setAttribute("d", newPath)
    );
  };

  const elasticRelease = () => {
    anime({
      targets: rangeSliderPathsRef.current,
      d: buildPath(
        -lastMouseDy * 1.3,
        rangeHeight - (currentY - lastMouseDy / mouseDyFactor)
      ),
      duration: 150,
      easing: "linear",
      complete: function () {
        anime({
          targets: rangeSliderPathsRef.current,
          d: buildPath(0, rangeHeight - currentY),
          duration: 4000,
          elasticity: 880,
        });
      },
    });

    anime({
      targets: rangeValuesRef.current,
      translateY: rangeHeight - (currentY + lastMouseDy / mouseDyFactor / 4),
      duration: 150,
      easing: "linear",
      complete: function () {
        anime({
          targets: rangeValuesRef.current,
          translateY: rangeHeight - currentY,
          duration: 4000,
          elasticity: 880,
        });
      },
    });
  };

  const handleMouseDown = (e) => {
    const mouseInitialY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY;
    rangeWrapperRef.current.setAttribute("data-mouse-initial-y", mouseInitialY);
    rangeWrapperRef.current.setAttribute("data-mouse-y", mouseInitialY);
  };

  const handleMouseMove = (e) => {
    if (rangeWrapperRef.current.getAttribute("data-mouse-y")) {
      const mouseY = parseInt(
        rangeWrapperRef.current.getAttribute("data-mouse-y")
      );
      const pageY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY;
      const newY = currentY + mouseY - pageY;
      if (
        newY >= (rangeHeight * rangeMin) / max &&
        newY <= (rangeHeight * rangeMax) / max
      ) {
        setCurrentY(newY);
        rangeWrapperRef.current.setAttribute("data-mouse-y", pageY);
      }
    }
  };

  const handleMouseUp = () => {
    if (mouseDy) {
      elasticRelease();
    }
    rangeWrapperRef.current.removeAttribute("data-mouse-y");
  };

  return (
    <div
      className="range__wrapper"
      ref={rangeWrapperRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <input
        className="range__input"
        type="range"
        min="0"
        max="100"
        value={rangeValue}
        readOnly
      />
      <svg
        className="range__slider"
        width="320px"
        height="480px"
        viewBox="0 0 320 480"
      >
        <defs>
          <symbol id="range__marks" shapeRendering="crispEdges">
            <path className="range__marks__path" d="M 257 30 l 33 0"></path>
            <path className="range__marks__path" d="M 268 60 l 22 0"></path>
            <path className="range__marks__path" d="M 278 90 l 12 0"></path>
            <path className="range__marks__path" d="M 278 120 l 12 0"></path>
            <path className="range__marks__path" d="M 278 150 l 12 0"></path>
            <path className="range__marks__path" d="M 278 180 l 12 0"></path>
            <path className="range__marks__path" d="M 278 210 l 12 0"></path>
            <path className="range__marks__path" d="M 278 240 l 12 0"></path>
            <path className="range__marks__path" d="M 278 270 l 12 0"></path>
            <path className="range__marks__path" d="M 278 300 l 12 0"></path>
            <path className="range__marks__path" d="M 278 330 l 12 0"></path>
            <path className="range__marks__path" d="M 278 360 l 12 0"></path>
            <path className="range__marks__path" d="M 278 390 l 12 0"></path>
            <path className="range__marks__path" d="M 268 420 l 22 0"></path>
            <path className="range__marks__path" d="M 257 450 l 33 0"></path>
          </symbol>
          <clipPath id="range__slider__clip-path">
            <path
              className="range__slider__path"
              d="M 0 480 l 320 0 l 0 480 l -320 0 Z"
            ></path>
          </clipPath>
        </defs>
        <use xlinkHref="#range__marks" className="range__marks__pink"></use>
        <path
          className="range__slider__path"
          d="M 0 480 l 320 0 l 0 480 l -320 0 Z"
          ref={(el) => (rangeSliderPathsRef.current[0] = el)}
        ></path>
        <use
          xlinkHref="#range__marks"
          className="range__marks__white"
          clipPath="url(#range__slider__clip-path)"
        ></use>
      </svg>
      <div className="range__values" ref={rangeValuesRef}>
        <div className="range__value range__value--top">
          <span className="range__value__number range__value__number--top">
            {100 - rangeValue}
          </span>
          <span className="range__value__text range__value__text--top">
            <span>Left</span>
          </span>
        </div>
        <div className="range__value range__value--bottom">
          <span className="range__value__number range__value__number--bottom">
            {rangeValue}
          </span>
          <span className="range__value__text range__value__text--bottom">
            <span>Right</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
