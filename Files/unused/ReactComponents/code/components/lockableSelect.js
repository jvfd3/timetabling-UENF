import Select, { components } from "react-select";
import defaultColors from "../config/defaultColors";
/* 
locker: {
  locked: "#000000",
  unlocked: "#708090",
},
*/
import { LockedProp, UnlockedProp } from "./Buttons/Dumb/Dumb";
/*
function LockedProp({ unlockFunc, text = "Locked", size = "2em" }) {
  return (
    <LockedPropIcon
      className={localClassNames.locked}
      onClick={unlockFunc}
      title={text}
      size={size}
    />
  );
}

function UnlockedProp({ lockFunc, text = "Unlocked", size = "2em" }) {
  return (
    <UnlockedPropIcon
      className={localClassNames.unlocked}
      onClick={lockFunc}
      title={text}
      size={size}
    />
  );
}
*/

function LockableSelect(extProps) {
  const {
    placeholder,
    options,
    value,
    onChange,
    getOptionValue,
    getOptionLabel,
    formatOptionLabel,
    lockStates,
  } = extProps;

  const { isLocked, setIsLocked, title } = lockStates;

  function LockSelect() {
    function toggleLock() {
      setIsLocked(!isLocked);
    }

    return (
      <div
        onClick={toggleLock}
        style={{
          pointerEvents: "auto",
          color: isLocked
            ? defaultColors.locker.locked
            : defaultColors.locker.unlocked,
          cursor: "pointer",
        }}
      >
        {isLocked ? <LockedProp text={title} /> : <UnlockedProp text={title} />}
      </div>
    );
  }

  function ValueWithLock(props) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <LockSelect {...lockStates} />
        <components.ValueContainer {...props} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <Select
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        className={myStyles.selects.className}
        styles={styleWidthFix}
        isDisabled={isLocked}
        isClearable={true}
        components={{ ValueContainer: ValueWithLock }}
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
}
