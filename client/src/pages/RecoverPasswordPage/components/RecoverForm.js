import React from 'react';
import { Form, Formik } from 'formik';
import Styles from './RecoverForm.module.sass';
import FormInput from '../../../components/FormInput/FormInput.js';
import Schems from '../../../validators/validationSchems.js';
import { connect } from 'react-redux';
import { passwordActionRecover} from '../../../actions/actionCreator.js';

class RecoverForm extends React.Component {

  componentDidMount(){
    const token = this.props.token;
    if(token){
      this.props.passwordRecoverRequest({ data: {token:token}, history: this.props.history});
    }
  };

  clicked = (values) => {
    this.props.passwordRecoverRequest({ data: values, history: this.props.history});
  };

  render() {
    const formInputClasses = {
      container: Styles.inputContainer,
      input: Styles.input,
      warning: Styles.fieldWarning,
      notValid: Styles.notValid,
      valid: Styles.valid,
    };

    return (
      <div className={Styles.recoverForm}>
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
              className={Styles.submitContainer}
            >
              RECOVER
            </button>
          </Form>
        </Formik>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    passwordRecoverRequest: ({ data, history }) => dispatch(passwordActionRecover(data, history)),
  }
);

export default connect(null,mapDispatchToProps)(RecoverForm);
