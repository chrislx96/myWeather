import React from "react";
import style from "./cityButton.scss";

class CityButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, onClick } = this.props;
    return (
      <>
        <button className={style.mybutton} onClick={onClick}>
          {children}
        </button>
      </>
    );
  }
}

export default CityButton;
