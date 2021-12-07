import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'
import LoadSpinner from '../components/LoadSpinner'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const Profile = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userDetail = useSelector((state) => state.userDetail)
  const { loading, error, user } = userDetail

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, navigate, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== passwordConf) {
      setMessage('Passwords do not match')
    } else {
      console.log('updating profile')
      dispatch(
        updateUserProfile({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        })
      )
      console.log('dispatch complete')
    }
    setMessage('')
  }

  return (
    <Row>
      <Col md={3}>
        <h2>My Account</h2>
        {message && (
          <AlertMessage heading="Oops!" variant="danger">
            {message}
          </AlertMessage>
        )}
        {error && (
          <AlertMessage heading="Error" variant="danger">
            {error}
          </AlertMessage>
        )}
        {loading && <LoadSpinner />}
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="name">
            <FormLabel className="mt-1">Name</FormLabel>
            <FormControl
              required
              type="name"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="email">
            <FormLabel className="mt-2">Email</FormLabel>
            <FormControl
              required
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel className="mt-2">Password</FormLabel>
            <FormControl
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="passwordConf">
            <FormLabel className="mt-2">Confirm password</FormLabel>
            <FormControl
              type="password"
              placeholder="password"
              value={passwordConf}
              onChange={(e) => setPasswordConf(e.target.value)}
            ></FormControl>
          </FormGroup>
          <div className="d-grid gap-2">
            <Button type="submit" className="btn btn-dark btn-sm mt-2">
              Update
            </Button>
          </div>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Order History</h2>
      </Col>
    </Row>
  )
}

export default Profile
