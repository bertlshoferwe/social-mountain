import React, { Component } from 'react';
import Post from './Post/Post'
import axios from 'axios'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }

  componentDidMount() {

   axios.get('https://practiceapi.devmountain.com/api/posts')
  .then( res => {
    this.setState({
      posts: res.data
    });
  })
  .catch((error) => {
    console.log(error);
  })

  }

  updatePost( id, text ) {

    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text })
    .then( res => {
      this.setState({
        posts: res.data
      });
    })
    .catch((error) => {
      console.log(error);
    })

  }

  deletePost( id ) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`)
    .then( results => {
      this.setState({
        posts: results.data
       });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  createPost( text ) {

    axios.post('https://practiceapi.devmountain.com/api/posts', { text })
    .then( res => {
      this.setState({
        posts: res.data
       });
    })
    .catch((error) => {
      console.log(error);
    })

  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPost={ this.createPost } />

          {
          posts.map( data => (
            <Post
              key={ data.id }
              text={ data.text }
              date = {data.date }
              id = { data.id }
              updatePost = { this.updatePost }
              deletePost = { this.deletePost }
             />
          ))
        }

        </section>
      </div>
    );
  }
}

export default App;
