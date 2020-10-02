import React from "react";

class WeatherElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, elementStyle } = this.props;
    return (
      <div className={elementStyle}>
        <span>{children}</span>
      </div>
    );
  }
}

export default WeatherElement;
