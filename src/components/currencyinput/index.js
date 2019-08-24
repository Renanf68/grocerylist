import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";

const repeatZeroes = times => {
  let result = "";
  let i = 0;
  for (i = 0; i < times; i++) {
    result += "0";
  }
  return result;
};
const removeOccurrences = (from, toRemove) => {
  const NewToRemove = toRemove.replace(
    /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
    "\\$&"
  );
  const re = new RegExp(NewToRemove, "g");
  return from.replace(re, "");
};
export const formattedRawValue = (rawValue, props) => {
  let precision = 2;
  let delimiter = ".";
  let separator = ",";
  let unit = "R$";
  if (props) {
    precision = props.precision;
    delimiter = props.delimiter;
    separator = props.separator;
    unit = props.unit;
  }
  const minChars = "0".length + precision;
  let result = "";
  result = `${rawValue}`;
  if (result.length < minChars) {
    const leftZeroesToAdd = minChars - result.length;
    result = `${repeatZeroes(leftZeroesToAdd)}${result}`;
  }
  let beforeSeparator = result.slice(0, result.length - precision);
  let afterSeparator = result.slice(result.length - precision);
  if (beforeSeparator.length > 3) {
    var chars = beforeSeparator.split("").reverse();
    let withDots = "";
    for (var i = chars.length - 1; i >= 0; i--) {
      let char = chars[i];
      let dot = i % 3 === 0 ? delimiter : "";
      withDots = `${withDots}${char}${dot}`;
    }
    withDots = withDots.substring(0, withDots.length - 1);
    beforeSeparator = withDots;
  }
  result = beforeSeparator + separator + afterSeparator;
  if (unit) {
    result = `${unit} ${result}`;
  }
  return result;
};

const CurrencyInput = props => {
  const [state, setState] = useState(0);
  useEffect(() => {
    setState(props.value);
  }, [props]);
  const getRawValue = displayedValue => {
    let result = displayedValue;
    result = removeOccurrences(result, props.delimiter);
    result = removeOccurrences(result, props.separator);
    result = removeOccurrences(result, props.unit);
    const intValue = parseInt(result);
    return intValue;
  };
  const notifyParentWithRawValue = rawValue => {
    return props.onInputChange(rawValue);
  };
  const onInputType = event => {
    const input = event.target.value;
    let rawValue = getRawValue(input);
    if (!rawValue) {
      rawValue = 0;
    }
    notifyParentWithRawValue(rawValue);
  };
  return (
    <Input
      id={props.id}
      onChange={onInputType}
      value={formattedRawValue(state, props)}
      name={props.name}
    />
  );
};

CurrencyInput.propTypes = {
  id: PropTypes.string,
  delimiter: PropTypes.string,
  onInputChange: PropTypes.func,
  precision: PropTypes.number,
  separator: PropTypes.string,
  value: PropTypes.number.isRequired
};

CurrencyInput.defaultProps = {
  value: 0,
  precision: 2,
  separator: ",",
  delimiter: ".",
  unit: "R$",
  onInputChange: () => {}
};

export default CurrencyInput;