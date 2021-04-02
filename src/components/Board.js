import React, { useState, useEffect } from 'react'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import defaultImg from '../assets/defaultImg.png'
import paperImg from '../assets/paper.png'
import scissorImg from '../assets/scissor.png'
import rockImg from '../assets/rock.png'

const Board = () => {
  const [cmpChoice, setCmpChoice] = useState(defaultImg)
  const [userChoice, setUserChoice] = useState(defaultImg)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [score, setScore] = useState(0)

  const changeUserImg = (imgName) =>{
    setUserChoice(imgName)
    setLoading(true)
    computerPlay()
  }

  const computerPlay = () => {
    let choices = [paperImg, rockImg, scissorImg];
    let idx= Math.floor(Math.random() * 3);
    setTimeout(()=>{ 
      setCmpChoice(choices[idx])
      setLoading(false)
     }, 2000);
    
  }

  const checkWinner = () => {
    if (userChoice !== defaultImg){
      // tie
      if (userChoice === cmpChoice){
        setMessage("You are tied !!")
      }else {
        // choice paper
        if(userChoice === paperImg ){
          if (cmpChoice === rockImg){
            setMessage("You win !!")
            setScore(prevState => {
              return  prevState+ 10
            })
          } else {
            setMessage("You loose !!")
          }
        // choice rock
        } else if (userChoice === rockImg ){
          if (cmpChoice === scissorImg){
            setMessage("You win !!")
            setScore(prevState => {
              return  prevState+ 10
            })
          } else {
            setMessage("You loose !!")
          }
        // choice scissors
        } else if (userChoice === scissorImg ){
          if (cmpChoice === paperImg){
            setMessage("You win !!")
            setScore(prevState => {
              return  prevState+ 10
            })
          } else {
            setMessage("You loose !!")
          }
        }
      }
    } 
  }


  useEffect( ()=>{
    console.log("cmp did change")
    checkWinner()
  },[cmpChoice] )

  return (
    <Container>
      <div>
        Score : <span>{score}</span>
      </div>
      <Row className="justify-content-md-center" xs={1} md={2} lg={3}>
        <Col className="m-3">
          <Card bg={!message ? 'light': (message === "You win !!")? 'danger' : (message === "You loose !!")? 'success' : 'light'}>
            <Card.Header style={{ backgroundColor: '#EAEAEA' }}>
              Computer
              {loading && <Spinner className="ml-2" animation="border" />}
            </Card.Header>
            <Card.Img variant="top" src={cmpChoice} />

          </Card>
          
        </Col>
        <Col className="m-3">
          <Card bg={!message ? 'light': (message === "You win !!")? 'success' : (message === "You loose !!")? 'danger' : 'light'}>
            <Card.Header style={{ backgroundColor: '#EAEAEA' }}>
              User
            </Card.Header>
            <Card.Img variant="top" src={ userChoice } />
            <Card.Footer style={{ backgroundColor: '#EAEAEA' }}>
              <Row className="justify-content-md-center">
                <Button className="m-1" variant="primary" onClick={() => changeUserImg(paperImg)}>Paper</Button>
                <Button className="m-1" variant="primary" onClick={() => changeUserImg(scissorImg)}>Scissor</Button>
                <Button className="m-1" variant="primary" onClick={() => changeUserImg(rockImg)}>Rock</Button>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <div>
        {message}
      </div>


    </Container>

  )
  
}

export default Board;