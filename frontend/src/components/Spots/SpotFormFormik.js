import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';


const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="errors">{meta.error}</div>
            ) : null}
        </>
    );
};

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="errors">{meta.error}</div>
            ) : null}
        </div>
    );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const SignupForm = ({ spot, formType }) => {

    return (
        <>
            <h1>{formType}</h1>
            <Formik
                initialValues={{
                    country: spot.country,
                    address: '',
                    city: '',
                    state: '',
                    latitude: '',
                    longitude: '',
                    description: '',
                    name: '',
                    price: '',
                    acceptedTerms: false, // added for our checkbox
                    // jobType: '', // added for our select

                }}

                validationSchema={Yup.object({
                    country: Yup.string()
                        .required('Country is required'),

                    address: Yup.string()
                        .required('Address is required'),

                    city: Yup.string()
                        .required('State is required'),

                    state: Yup.string()
                        .required('State is required'),

                    latitude: Yup.number()
                        .min(-90, 'Latitude must be greater than -90')
                        .max(90, 'Latitude must be less than 90')
                        .required('Latitude is required'),

                    longitude: Yup.number()
                        .min(-180, 'Longitude must be greater than -180')
                        .max(180, 'Longitude must be less than 180')
                        .required('Longitude is required'),
                    description: Yup.string()
                        .min(30, 'Must be 30 characters or more')
                        .required('Description is required'),

                    name: Yup.string()
                        .required('Name is required'),

                    price: Yup.number()
                        .required('Price is required'),

                    acceptedTerms: Yup.boolean()
                        .required('Required')
                        .oneOf([true], 'You must accept the terms and conditions.'),

                    // jobType: Yup.string()
                    //     .oneOf(
                    //         ['designer', 'development', 'product', 'other'],
                    //         'Invalid Job Type'
                    //     )
                    //     .required('Required'),

                })}

                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);

                    window.alert('hi');
                }}

            >
                <Form>
                    <div style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>

                        <h3>Where's your place located?</h3>
                        <p>Guests will only get your exact address once they book a reservation.</p>
                        <MyTextInput
                            label="Country"
                            name="country"
                            type="text"
                            placeholder="Country"
                        />

                        <MyTextInput
                            label="Address"
                            name="address"
                            type="text"
                            placeholder="Street Address"
                        />

                        <MyTextInput
                            label="City"
                            name="city"
                            type="text"
                            placeholder="City"
                        />

                        <MyTextInput
                            label="State"
                            name="state"
                            type="text"
                            placeholder="State"
                        />

                        <MyTextInput
                            label="Latitude"
                            name="latitude"
                            type="number"
                            placeholder="Latitude"
                        />

                        <MyTextInput
                            label="Longitude"
                            name="longitude"
                            type="number"
                            placeholder="Longitude"
                        />

                    </div>

                    <div style={{ borderBottom: '1px solid black' }}>
                        <h3>Describe your place to guests</h3>
                        <p>Mention the best features of your space, any special amentities like
                            fast wifi or parking, and what you love about the neighborhood</p>

                        <MyTextInput
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="Description"
                        />
                    </div>

                    <div style={{ borderBottom: '1px solid black' }}>
                        <h3>Create a title for your spot</h3>
                        <p>Catch guests' attention with a spot title that highlights what makes
                            your place special. </p>

                        <MyTextInput
                            label="Name of your spot"
                            name="name"
                            type="text"
                            placeholder="Name of your spot"
                        />
                    </div>

                    <div style={{ borderBottom: '1px solid black' }}>
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher
                            in search results.</p>

                        <MyTextInput
                            label="Price per night (USD) "
                            name="price"
                            type="number"
                            placeholder="Price per night"
                        />
                    </div>

                    {/*
                    <MySelect label="Job Type" name="jobType">
                        <option value="">Select a job type</option>
                        <option value="designer">Designer</option>
                        <option value="development">Developer</option>
                        <option value="product">Product Manager</option>
                        <option value="other">Other</option>
                    </MySelect> */}

                    <MyCheckbox name="acceptedTerms">
                        I accept the terms and conditions
                    </MyCheckbox>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    );
};

export default SignupForm;
