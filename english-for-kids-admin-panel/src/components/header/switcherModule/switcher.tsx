import React from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

interface SwitcherState {
  hideSwitcher: boolean,
}

interface SwitcherProps {
  toggleMode: () => void,
}

class Switcher extends React.Component<SwitcherProps, SwitcherState> {
  constructor(props: SwitcherProps | Readonly<SwitcherProps>) {
    super(props);
    this.state = {
      hideSwitcher: false,
    };
  }

  render(): JSX.Element {
    const { toggleMode } = this.props;
    const { hideSwitcher } = this.state;
    return (
      <div style={{ display: `${hideSwitcher ? 'none' : 'block'}` }}>
        <BootstrapSwitchButton
          checked={false}
          onstyle="info"
          onlabel="Play"
          offlabel="Train"
          size="sm"
          width={100}
          onChange={() => {
            toggleMode();
          }}
        />
      </div>
    );
  }
}

export default Switcher;
