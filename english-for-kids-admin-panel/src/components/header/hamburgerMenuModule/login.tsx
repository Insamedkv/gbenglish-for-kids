import React from 'react';

interface LoginProps {
  show: string,
  hideLoginPopUp: () => void,
}

interface LoginState {
  loginValue: string,
  passwordValue: string,
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps | Readonly<LoginProps>) {
    super(props);
    this.state = {
      loginValue: '',
      passwordValue: '',
    };
    this.loginChange = this.loginChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  loginChange(event: { target: { value: string; }; }): void {
    this.setState({ loginValue: event.target.value });
  }

  passwordChange(event: { target: { value: string; }; }): void {
    this.setState({ passwordValue: event.target.value });
  }

  render(): JSX.Element {
    const { show, hideLoginPopUp } = this.props;
    return (
      <form
        className="login"
        style={{ display: show === 'show' ? 'block' : 'none' }}
        action="/api/auth"
        method="post"
      >
        <div className="login__position">
          <div className="login__header">
            LOGIN
          </div>
          <input
            type="text"
            placeholder="Login"
            value={this.state.loginValue}
            onChange={this.loginChange}
            className="login__name"
            name="username"
          />
          <input
            type="text"
            placeholder="Password"
            value={this.state.passwordValue}
            onChange={this.passwordChange}
            className="login__password"
            name="password"
          />
          <div className="login__control">
            <button
              className="login__button cancel-but"
              type="button"
              onClick={() => hideLoginPopUp()}
            >
              CANCEL
            </button>
            <button
              className="login__button login-but"
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;
