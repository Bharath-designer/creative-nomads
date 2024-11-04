import React, { useEffect, useState } from "react";

import "../styles/components/OptionsDialog.css";

import { useDispatch, useSelector } from "react-redux";
import { toggleOptions } from "../store/OptionsSlice";
import { setGraphData1, setGraphData2 } from "../store/GraphSlice";

const OptionsDialog = () => {
  const [data1, setData1] = useState(["", "", "", "", "", "", ""]);
  const [data2, setData2] = useState(["", "", "", "", "", "", ""]);
  const [fontSize, setFontSize] = useState("");
  const [dontShow, setDontshow] = useState(false);

  const handleInput = (row, column, value) => {
    if (!isNaN(parseInt(value)) || value === "") {
      if (row === 0) {
        setData1((prev) => {
          prev[column] = value ? parseInt(value) : value;
          return [...prev];
        });
      } else {
        setData2((prev) => {
          prev[column] = value ? parseInt(value) : value;
          return [...prev];
        });
      }
    }
  };

  const isUpdateDisabled = (data) => {
    return !data.every((element) => {
      return !isNaN(element) && element !== "";
    });
  };

  const changeFontSize = (value) => {
    setFontSize(value);
    localStorage.setItem("fontsize", value);
  };

  const isOptionsOpen = useSelector((state) => state.optionData.isOpen);

  const dispatch = useDispatch();

  const handleDontShowChange = () => {
    if (dontShow) {
      setDontshow(false);
      localStorage.setItem("dontshow", "false");
    } else {
      setDontshow(true);
      localStorage.setItem("dontshow", "true");
    }
  };

  useEffect(() => {
    const valueMap = {
      d: "1rem",
      vs: "12px",
      s: "14px",
      r: "16px",
      l: "18px",
    };
    document.querySelector("html").style.fontSize = valueMap[fontSize];
  }, [fontSize]);

  useEffect(() => {
    const tempSize = localStorage.getItem("fontsize");
    const validSizes = ["d", "vs", "s", "r", "l"];
    setFontSize(validSizes.includes(tempSize) ? tempSize : "d");
  }, []);

  useEffect(() => {
    const isDontShow = localStorage.getItem("dontshow") === "true";
    if (!isDontShow) {
      setTimeout(() => {
        dispatch(toggleOptions(true));
      }, 2000);
    }
    setDontshow(isDontShow);
  }, [dispatch]);

  useEffect(() => {
    console.log("called");

    const handleKeyDown = (e) => {
      if (e.ctrlKey && (e.key === "o" || e.key === "O")) {
        e.preventDefault();
        console.log("okkkk");

        dispatch(toggleOptions(true));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  const closeOptions = () => {
    dispatch(toggleOptions(false));
  };

  const handleUpdateBtn = () => {
    dispatch(setGraphData1([...data1]));
    dispatch(setGraphData2([...data2]));
    dispatch(toggleOptions(false));
  };
  const graphData1 = useSelector((state) => state.graphData.data1);
  const graphData2 = useSelector((state) => state.graphData.data2);

  useEffect(() => {
    setData1([...graphData1]);
    setData2([...graphData2]);
  }, []);

  const handleClickOutside = (event) => {
    if (!event.target.closest(".container")) {
      dispatch(toggleOptions(false));
    }
  };

  useEffect(() => {
    if (isOptionsOpen)
      document
        .querySelector(".options-dialog-wrapper")
        ?.addEventListener("click", handleClickOutside);
    else
      document
        .querySelector(".options-dialog-wrapper")
        ?.removeEventListener("click", handleClickOutside);
  }, [isOptionsOpen]);

  if (!isOptionsOpen) {
    return null;
  }

  return (
    <div className="options-dialog-wrapper">
      <div className="container">
        <div className="header">
          Options <code>(ctrl + o)</code>
        </div>
        <div className="content">
          <div className="row">
            <div className="label">Edit Graph line 1</div>
            <div className="row-content">
              <span>
                <input
                  onChange={(e) => handleInput(0, 0, e.target.value)}
                  maxLength={3}
                  value={data1[0]}
                />
              </span>
              <span>
                <input
                  onChange={(e) => handleInput(0, 1, e.target.value)}
                  maxLength={3}
                  value={data1[1]}
                />
              </span>
              <span>
                <input
                  onChange={(e) => handleInput(0, 2, e.target.value)}
                  maxLength={3}
                  value={data1[2]}
                />
              </span>
              <span>
                <input
                  onChange={(e) => handleInput(0, 3, e.target.value)}
                  maxLength={3}
                  value={data1[3]}
                />
              </span>
              <span>
                <input
                  onChange={(e) => handleInput(0, 4, e.target.value)}
                  maxLength={3}
                  value={data1[4]}
                />
              </span>
              <span>
                <input
                  onChange={(e) => handleInput(0, 5, e.target.value)}
                  maxLength={3}
                  value={data1[5]}
                />
              </span>
              <span>
                <input
                  onChange={(e) => handleInput(0, 6, e.target.value)}
                  maxLength={3}
                  value={data1[6]}
                />
              </span>
              <span className="update-btn">
                <button
                  onClick={handleUpdateBtn}
                  disabled={isUpdateDisabled(data1)}
                >
                  Update
                </button>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="label">Edit Graph line 2</div>
            <div className="row-content">
              <span>
                <input
                  onChange={(e) => handleInput(1, 0, e.target.value)}
                  maxLength={3}
                  value={data2[0]}
                />
              </span>
              <span>
                <input
                  onChange={(e) => handleInput(1, 1, e.target.value)}
                  maxLength={3}
                  value={data2[1]}
                />
              </span>
              <span>
                <input
                  onChange={(e) => handleInput(1, 2, e.target.value)}
                  maxLength={3}
                  value={data2[2]}
                />
              </span>
              <span>
                <input
                  onChange={(e) => handleInput(1, 3, e.target.value)}
                  maxLength={3}
                  value={data2[3]}
                />
              </span>
              <span>
                <input
                  onChange={(e) => handleInput(1, 4, e.target.value)}
                  maxLength={3}
                  value={data2[4]}
                />
              </span>
              <span>
                <input
                  onChange={(e) => handleInput(1, 5, e.target.value)}
                  maxLength={3}
                  value={data2[5]}
                />
              </span>
              <span>
                <input
                  onChange={(e) => handleInput(1, 6, e.target.value)}
                  maxLength={3}
                  value={data2[6]}
                />
              </span>
              <span className="update-btn">
                <button
                  onClick={handleUpdateBtn}
                  disabled={isUpdateDisabled(data2)}
                >
                  Update
                </button>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="label">Font size</div>
            <div className="row-content">
              <span
                onClick={() => changeFontSize("d")}
                className={`card ${fontSize === "d" ? "active" : ""}`}
              >
                System Default
              </span>
              <span
                onClick={() => changeFontSize("vs")}
                className={`card ${fontSize === "vs" ? "active" : ""}`}
              >
                Very Small
              </span>
              <span
                onClick={() => changeFontSize("s")}
                className={`card ${fontSize === "s" ? "active" : ""}`}
              >
                Small
              </span>
              <span
                onClick={() => changeFontSize("r")}
                className={`card ${fontSize === "r" ? "active" : ""}`}
              >
                Regular
              </span>
              <span
                onClick={() => changeFontSize("l")}
                className={`card ${fontSize === "l" ? "active" : ""}`}
              >
                Large
              </span>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="dont-show-row">
            <span>
              <input
                onChange={handleDontShowChange}
                checked={dontShow}
                id="dont-show"
                type="checkbox"
              />
            </span>
            <label htmlFor="dont-show">Don't show on start</label>
          </div>
          <button onClick={closeOptions}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default OptionsDialog;
