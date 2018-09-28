import React, { Component } from 'react'
import MainLayout from '../../components/mainLayout'
const HomePage = () => (
  <div>
    home page
  </div>
)
class Home extends Component {
  render() {
    return (
     <MainLayout location='/home'>
       <HomePage></HomePage>
     </MainLayout> 
    )
  }
}

export default Home