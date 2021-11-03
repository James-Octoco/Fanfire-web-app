import { Link as RouterLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  Link, Paper,
  Switch,
  TextField,
  TextArea,
  Typography
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import wait from '../../../utils/wait';
import countries from './countries';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserDetails,
  selectPublicProfile,
  selectUserStatus,
  updateProfilePicture,
  updatePublicProfile
} from '../../../slices/user';
import QuillEditor from '../../QuillEditor';
import { useEffect, useState } from 'react';
import FileDropzone from '../../FileDropzone';

const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

const AccountGeneralSettings = (props) => {
  const { user } = useAuth();
  const userPublicProfile = useSelector(selectPublicProfile);
  const userStatus = useSelector(selectUserStatus);
  const { name, username, website, bio, imageUri } = userPublicProfile;
  const [profilePic, setProfilePic] = useState(imageUri);
  const [picChanged, setPicChanged] = useState(false);
  const [showFileDrop, setShowFileDrop] = useState(false);

  const dispatch = useDispatch();

  const getUserDetails = async () => {
    await dispatch(fetchUserDetails());
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const submitHandler = async (formData) => {
    const { _name, _username, _website, _bio } = formData;
    await dispatch(updatePublicProfile({
      name: _name,
      username: _username,
      website: _website,
      bio: _bio
    }));
    if (picChanged) {
      const base64 = profilePic.split(',')[1];
      console.log('base64', profilePic);
      dispatch(updateProfilePicture({ base64FileContent: profilePic, fileName: `${username}.jpg` }));
    }
  };

  useEffect(() => {
    if (profilePic !== imageUri) {
      setPicChanged(true);
    }
  }, [profilePic]);

  const handleProfilePicDrop = async ([file]) => {
    const data = await toBase64(file);
    setProfilePic(data);
  };

  return (
    <Grid
      container
      spacing={3}
      {...props}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center'
              }}
            >
              <Box
                sx={{
                  p: 1,
                  border: (theme) => `1px dashed ${theme.palette.divider}`,
                  borderRadius: '50%'
                }}
              >
                <Avatar
                  src={profilePic}
                  sx={{
                    height: 100,
                    width: 100
                  }}
                />
              </Box>
              <Typography
                color="textPrimary"
                sx={{ mt: 1 }}
                variant="subtitle2"
              >
                {user.name}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth
              variant="text"
              onClick={() => setShowFileDrop(true)}
            >
              Update Picture
            </Button>
          </CardActions>
          <CardActions>
            <Button
              color="secondary"
              fullWidth
              variant="text"
            >
              Remove Picture
            </Button>
          </CardActions>
        </Card>
        {showFileDrop && (
        <Box
          sx={{ paddingTop: 2 }}
        >
          <FileDropzone
            accept="image/*"
            maxFiles={1}
            onDrop={handleProfilePicDrop}
          />
        </Box>
        )}
      </Grid>
      <Grid
        item
        lg={8}
        md={6}
        xl={9}
        xs={12}
      >
        <Formik
          enableReinitialize
          initialValues={{
            email: user.email || '',
            name: name || '',
            username: username || '',
            bio: bio || '',
            website: website || '',
            submit: null
          }}
          validationSchema={Yup
            .object()
            .shape({
              email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              name: Yup
                .string()
                .max(255)
                .required('Name is required'),
              username: Yup
                .string()
                .max(255)
                .required('Username is required'),
              bio: Yup
                .string()
                .max(255),
              website: Yup
                .string()
                .max(255)
            })}
          onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            try {
              await submitHandler(
                {
                  _name: values.name,
                  _username: values.username,
                  _website: values.website,
                  _bio: values.bio
                }
              );
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              toast.success('Profile updated!');
            } catch (err) {
              console.error(err);
              toast.error('Something went wrong!');
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader title="Profile" />
                <Divider />
                <CardContent>
                  <Grid
                    container
                    spacing={4}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label="Name"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email
                          ? errors.email
                          : 'We will use this email to contact you'}
                        label="Email Address"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        disabled
                        type="email"
                        value={values.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.username && errors.username)}
                        fullWidth
                        helperText={touched.username && errors.username}
                        label="Username"
                        name="username"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.username}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.website && errors.website)}
                        fullWidth
                        helperText={touched.website && errors.website}
                        label="Website"
                        name="website"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.website}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.bio && errors.bio)}
                        fullWidth
                        helperText={touched.bio && errors.bio}
                        label="Bio"
                        placeholder="Tell us more about yourself"
                        name="bio"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.bio}
                        variant="outlined"
                        multiline
                        minRows={2}
                      />
                    </Grid>
                    {/* <Grid */}
                    {/*  item */}
                    {/*  md={6} */}
                    {/*  xs={12} */}
                    {/* > */}
                    {/*  <Typography */}
                    {/*    color="textPrimary" */}
                    {/*    gutterBottom */}
                    {/*    variant="subtitle2" */}
                    {/*  > */}
                    {/*    Available to hire */}
                    {/*  </Typography> */}
                    {/*  <Typography */}
                    {/*    color="textSecondary" */}
                    {/*    variant="body2" */}
                    {/*  > */}
                    {/*    Toggling this will let your teammates know */}
                    {/*    that you are available for acquiring new */}
                    {/*    projects */}
                    {/*  </Typography> */}
                    {/*  <Switch */}
                    {/*    checked={values.canHire} */}
                    {/*    color="primary" */}
                    {/*    edge="start" */}
                    {/*    name="canHire" */}
                    {/*    onChange={handleChange} */}
                    {/*  /> */}
                    {/* </Grid> */}
                  </Grid>
                  {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>
                      {errors.submit}
                    </FormHelperText>
                  </Box>
                  )}
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                  }}
                >
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                  >
                    Save Changes
                  </Button>
                </Box>
              </Card>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AccountGeneralSettings;
