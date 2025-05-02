import { Col, Row, Typography } from 'antd'
import React from 'react'

const CopyRight = () => {
  return (
    <>
          <div className="container py-3">
        <Row>
          <Col span={24}>
            <Typography.Paragraph className='text-center text-white mb-0'>
              &copy; {new Date().getFullYear()} All Right Reserver
            </Typography.Paragraph>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default CopyRight
