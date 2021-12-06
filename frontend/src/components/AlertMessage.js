import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertMessage = ({ heading, variant, children }) => {
  return (
    <div>
      <Alert variant={variant}>
        <Alert.Heading>{heading}</Alert.Heading>
        {children}
      </Alert>
    </div>
  )
}

export default AlertMessage
