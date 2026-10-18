import { useState, useEffect } from "react";

import {
  FaUniversalAccess,
  FaTimes,
  FaSearchPlus,
  FaMousePointer,
  FaSun,
  FaAdjust,
  FaTint,
  FaUndo,
} from "react-icons/fa";

import "./AccessibilityWidget.css";

function AccessibilityWidget() {

  // ==========================
  // PANEL OPEN / CLOSE
  // ==========================

  const [isOpen, setIsOpen] = useState(false);


  // ==========================
  // ACCESSIBILITY SETTINGS
  // ==========================

  // 0 = OFF
  // 1 = Level 1
  // 2 = Level 2
  // 3 = Level 3
  // 4 = Level 4

  const [bigText, setBigText] = useState(0);

  const [bigCursor, setBigCursor] =
    useState(false);

  const [readableFont, setReadableFont] =
    useState(false);

  const [invertColors, setInvertColors] =
    useState(false);

  const [brightness, setBrightness] =
    useState(0);

  const [highContrast, setHighContrast] =
    useState(false);

  const [grayscale, setGrayscale] =
    useState(false);


  // ==========================
  // CUSTOM CURSOR POSITION
  // ==========================

  const [cursorX, setCursorX] =
    useState(0);

  const [cursorY, setCursorY] =
    useState(0);


  // ==========================
  // TRACK MOUSE POSITION
  // ==========================

  useEffect(() => {

    const handleMouseMove = (event) => {

      setCursorX(event.clientX);

      setCursorY(event.clientY);

    };


    document.addEventListener(
      "mousemove",
      handleMouseMove
    );


    return () => {

      document.removeEventListener(
        "mousemove",
        handleMouseMove
      );

    };

  }, []);


  // ==========================
  // APPLY ACCESSIBILITY SETTINGS
  // ==========================

  useEffect(() => {

    // ==========================
    // BIGGER TEXT
    // ==========================

    document.body.classList.remove(
      "accessibility-text-1",
      "accessibility-text-2",
      "accessibility-text-3",
      "accessibility-text-4"
    );


    if (bigText > 0) {

      document.body.classList.add(
        `accessibility-text-${bigText}`
      );

    }


    // ==========================
    // BIGGER CURSOR
    // ==========================

    document.body.classList.toggle(
      "accessibility-big-cursor",
      bigCursor
    );


    // ==========================
    // READABLE FONT
    // ==========================

    document.body.classList.toggle(
      "accessibility-readable-font",
      readableFont
    );


    // ==========================
    // INVERT COLORS
    // ==========================

    document.body.classList.toggle(
      "accessibility-invert",
      invertColors
    );


    // ==========================
    // BRIGHTNESS
    // ==========================

    document.body.classList.remove(
      "accessibility-brightness-1",
      "accessibility-brightness-2",
      "accessibility-brightness-3",
      "accessibility-brightness-4"
    );


    if (brightness > 0) {

      document.body.classList.add(
        `accessibility-brightness-${brightness}`
      );

    }


    // ==========================
    // HIGH CONTRAST
    // ==========================

    document.body.classList.toggle(
      "accessibility-high-contrast",
      highContrast
    );


    // ==========================
    // GRAYSCALE
    // ==========================

    document.body.classList.toggle(
      "accessibility-grayscale",
      grayscale
    );


  }, [
    bigText,
    bigCursor,
    readableFont,
    invertColors,
    brightness,
    highContrast,
    grayscale,
  ]);


  // ==========================
  // RESET ALL SETTINGS
  // ==========================

  const resetSettings = () => {

    setBigText(0);

    setBigCursor(false);

    setReadableFont(false);

    setInvertColors(false);

    setBrightness(0);

    setHighContrast(false);

    setGrayscale(false);

  };


  // ==========================
  // BIGGER TEXT
  // ==========================

  const handleBigText = () => {

    setBigText((currentSize) => {

      if (currentSize >= 4) {

        return 0;

      }

      return currentSize + 1;

    });

  };


  // ==========================
  // BRIGHTNESS
  // ==========================

  const handleBrightness = () => {

    setBrightness((currentLevel) => {

      if (currentLevel >= 4) {

        return 0;

      }

      return currentLevel + 1;

    });

  };


  return (

    <>

      {/* ==========================
          CUSTOM BIG CURSOR
      ========================== */}

      {bigCursor && (

        <div
          className="big-custom-cursor"
          style={{
            left: `${cursorX}px`,
            top: `${cursorY}px`,
          }}
        >

          <div className="cursor-arrow">

            <span></span>

          </div>

        </div>

      )}


      {/* ==========================
          ACCESSIBILITY BUTTON
      ========================== */}

      {!isOpen && (

        <button
          className="accessibility-button"
          onClick={() =>
            setIsOpen(true)
          }
          aria-label="Open Accessibility Options"
          title="Accessibility Options"
        >

          <FaUniversalAccess />

        </button>

      )}


      {/* ==========================
          ACCESSIBILITY PANEL
      ========================== */}

      {isOpen && (

        <div className="accessibility-panel">


          {/* ==========================
              HEADER
          ========================== */}

          <div className="accessibility-header">

            <h2>
              Accessibility Options
            </h2>


            <button
              className="accessibility-close"
              onClick={() =>
                setIsOpen(false)
              }
              aria-label="Close Accessibility Options"
            >

              <FaTimes />

            </button>

          </div>


          {/* ==========================
              CONTENT
          ========================== */}

          <div className="accessibility-content">


            {/* ==========================
                CONTENT OPTIONS
            ========================== */}

            <h3>
              Content
            </h3>


            <div className="accessibility-options">


              {/* ==========================
                  BIGGER TEXT
              ========================== */}

              <button
                className={`accessibility-option ${
                  bigText > 0
                    ? "active"
                    : ""
                }`}
                onClick={handleBigText}
              >

                <div className="option-icon">

                  <FaSearchPlus />

                </div>


                <span>
                  Bigger Text
                </span>


                {bigText > 0 && (

                  <small className="option-level">

                    Level {bigText}

                  </small>

                )}

              </button>


              {/* ==========================
                  BIGGER CURSOR
              ========================== */}

              <button
                className={`accessibility-option ${
                  bigCursor
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setBigCursor(!bigCursor)
                }
              >

                <div className="option-icon">

                  <FaMousePointer />

                </div>


                <span>
                  Bigger Cursor
                </span>

              </button>


              {/* ==========================
                  READABLE FONT
              ========================== */}

              <button
                className={`accessibility-option ${
                  readableFont
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setReadableFont(
                    !readableFont
                  )
                }
              >

                <div className="option-icon">

                  Aa

                </div>


                <span>
                  Readable Font
                </span>

              </button>


            </div>


            {/* ==========================
                COLOR OPTIONS
            ========================== */}

            <h3>
              Colors
            </h3>


            <div className="accessibility-options">


              {/* ==========================
                  INVERT COLORS
              ========================== */}

              <button
                className={`accessibility-option ${
                  invertColors
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setInvertColors(
                    !invertColors
                  )
                }
              >

                <div className="option-icon">

                  <FaAdjust />

                </div>


                <span>
                  Invert Colors
                </span>

              </button>


              {/* ==========================
                  BRIGHTNESS
              ========================== */}

              <button
                className={`accessibility-option ${
                  brightness > 0
                    ? "active"
                    : ""
                }`}
                onClick={
                  handleBrightness
                }
              >

                <div className="option-icon">

                  <FaSun />

                </div>


                <span>
                  Brightness
                </span>


                {brightness > 0 && (

                  <small className="option-level">

                    Level {brightness}

                  </small>

                )}

              </button>


              {/* ==========================
                  CONTRAST
              ========================== */}

              <button
                className={`accessibility-option ${
                  highContrast
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setHighContrast(
                    !highContrast
                  )
                }
              >

                <div className="option-icon">

                  <FaAdjust />

                </div>


                <span>
                  Contrast
                </span>

              </button>


              {/* ==========================
                  GRAYSCALE
              ========================== */}

              <button
                className={`accessibility-option ${
                  grayscale
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setGrayscale(
                    !grayscale
                  )
                }
              >

                <div className="option-icon">

                  <FaTint />

                </div>


                <span>
                  Grayscale
                </span>

              </button>


            </div>


            {/* ==========================
                RESET
            ========================== */}

            <button
              className="reset-accessibility"
              onClick={resetSettings}
            >

              <FaUndo />

              &nbsp;

              Reset Settings

            </button>


          </div>

        </div>

      )}

    </>

  );

}

export default AccessibilityWidget;