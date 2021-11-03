import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { Route, Switch } from 'react-router-dom';

import {auth, createUserProfileDocument} from './firebase/firebase.utils'


 class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      currentUser: null
    }
  }
  unsubscribeFromAuth = null
  componentDidMount(){
    this.unsubscibeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //if username isnt null
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        //query for the id and all the data within the user profile
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
          
        })
      //sets username to null
      } else {
        this.setState({currentUser: userAuth})
      }
 
    })
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
          
        </Switch>
  
          
      </div>
    );
  }

}

export default App;
