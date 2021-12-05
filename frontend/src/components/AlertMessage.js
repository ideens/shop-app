import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertMessage = ({ variant, children }) => {
  return (
    <div>
      <Alert variant={variant}>
        <Alert.Heading>Error</Alert.Heading>
        {children}
      </Alert>
    </div>
  )
}

export default AlertMessage
