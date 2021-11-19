import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions';


 class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount(){

    const {setCurrentUser} = this.props

    this.unsubscibeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //if username isnt null
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        //query for the id and all the data within the user profile
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
              ...snapShot.data()
          })
          
        })
      //sets username to null
      } else {
        setCurrentUser(userAuth)
      }
 
    })
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
          
        </Switch>
  
          
      </div>
    );
  }

}

const mapStateToProps = ({user}) => ( {
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
