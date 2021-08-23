import React from 'react';
import { Form, Formik } from 'formik';
import Styles from './RecoverForm.module.sass';
import FormInput from '../../../components/FormInput/FormInput.js';
import Schems from '../../../validators/validationSchems.js';
import { connect } from 'react-redux';
import { passwordActionRecover, passwordRecoverActionClear} from '../../../actions/actionCreator.js';
import Error from '../../../components/Error/Error.js';


class RecoverForm extends React.Component {

  componentWillUnmount() {
    this.props.passwordRecoverClear();
  }

  componentDidMount(){
    const token = this.props.token;
    if(token){
      this.props.passwordRecoverRequest({ data: {token:token}, history: this.props.history.replace('/')});
    }
  };

  clicked = (values) => {
    this.props.passwordRecoverRequest({ data: values, history: this.props.history});
  };

  render() {
    const { error, isFetching, isDone } = this.props.recoverPassword;
    const { submitting, passwordRecoverClear } = this.props;

    const formInputClasses = {
      container: Styles.inputContainer,
      input: Styles.input,
      warning: Styles.fieldWarning,
      notValid: Styles.notValid,
      valid: Styles.valid,
    };

    return (
      <div className={Styles.recoverForm}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={passwordRecoverClear}
          />
          )}
        <h2>RECOVER YOUR PASSWORD</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }
          }
          onSubmit={this.clicked}
          validationSchema={Schems.LoginSchem}
        >
          <Form>
            <FormInput
              classes={formInputClasses}
              name="email"
              type="text"
              label="Email Address"
            />
            <FormInput
              classes={formInputClasses}
              name="password"
              type="password"
              label="Password"
            />
            <button
              type="submit"
              disabled={submitting}
              className={Styles.submitContainer}
            >
              <span className={Styles.inscription}>
                  {isFetching
                    ? 'Submitting...'
                    : 'RECOVER PASSWORD'}
              </span>
            </button>
            {isDone && (<p>Check your email for updating link...</p>)}
          </Form>
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { recoverPassword } = state;
  return { recoverPassword };
};

const mapDispatchToProps = (dispatch) => (
  {
    passwordRecoverRequest: ({ data, history }) => dispatch(passwordActionRecover(data, history)),
    passwordRecoverClear: () => dispatch(passwordRecoverActionClear()),
  }
);

export default connect(mapStateToProps,mapDispatchToProps)(RecoverForm);
