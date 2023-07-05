import React from 'react';
import PropTypes from 'prop-types';
import Anime from '@mollycule/react-anime';
import { Form, Field } from 'react-final-form';
import { useUsersCreateMutation } from '../../app/services/users';
// import ErrorWithDelay from "./ErrorWithDelay";
import { login } from '../../storage/auth';
import {
    composeValidators,
    required,
    emailRegexp,
    match_email,
    instRegexp,
    match_inst,
    phoneRegexp,
    match_phone,
    normalizePhone,
} from './validation';
// import { fetchUser } from "../api";

// animations
const delay = 600;

const WrappedField = ({ input, meta, placeholder, animationDelay }) => {
    const name = input.name;
    const { touched, error } = meta;
    const invalid = error && touched;
    let classes = `field field-${name}`;
    if (invalid) classes += ' invalid';

    return (
        <Anime
            in
            duration={800}
            appear
            onEntering={{
                opacity: [0, 1],
                translateX: [-270, 0],
                easing: 'easeOutElastic(1, 0.7)',
                delay: delay + animationDelay,
            }}
        >
            <div className={classes}>
                <div className="control">
                    <input {...input} type="text" placeholder={placeholder} />
                    {invalid && (
                        <div className="error">
                            <span>{error}</span>
                        </div>
                    )}
                    {/*<ErrorWithDelay name={name} delay={3000}>*/}
                    {/*{error => <div className="error"><span>{error}</span></div>}*/}
                    {/*</ErrorWithDelay>*/}
                </div>
            </div>
        </Anime>
    );
};

WrappedField.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
};

const LoginForm = () => {
    const [create] = useUsersCreateMutation();

    const onSubmit = async ({ email: Email, instagram: Instagram, phone: Phone }) => {
        // trying fetch user
        // try {
        //     const response = await fetchUser(
        //         values.email, values.instagram, values.phone
        //     );
        //     if (response.data.data.length) {
        //         login(values);
        //         navigate.push(next);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }

        // if no user, create it
        try {
            const result = await create({
                fields: { Email, Instagram, Phone },
            }).unwrap();

            login(result.id);
        } catch (error) {}
    };

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, values }) => (
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-fields">
                        <Field
                            name="email"
                            placeholder="Email"
                            animationDelay={0}
                            component={WrappedField}
                            validate={composeValidators(required, match_email)}
                        />
                        <Field
                            name="phone"
                            placeholder="(999) 999-9999"
                            animationDelay={200}
                            component={WrappedField}
                            validate={composeValidators(required, match_phone)}
                            parse={normalizePhone}
                        />
                        <Field
                            name="instagram"
                            placeholder="Instagram handle optional"
                            animationDelay={100}
                            component={WrappedField}
                            validate={composeValidators(match_inst)}
                        />
                    </div>

                    <div className="form-btn-wrap center-text">
                        <Anime
                            in
                            duration={1000}
                            appear
                            onEntering={{
                                opacity: [0, 1],
                                translateX: [270, 0],
                                rotateX: [-180, 0],
                                rotateY: [-210, 0],
                                rotateZ: [-90, 0],
                                delay: delay + 100,
                                easing: 'easeOutElastic(1, .7)',
                            }}
                        >
                            <button type="submit" disabled={submitting} className="btn btn-green">
                                <span className="btn-text">{'deal'}</span>
                            </button>
                        </Anime>
                    </div>
                </form>
            )}
        />
    );
};

export default LoginForm;
