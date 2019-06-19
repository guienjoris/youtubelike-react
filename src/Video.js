import React , { Component } from 'react';
import axios from 'axios';
export class Video extends Component {
  state = {
    userInput:"",
    video: "",
    videoLink:"",
    synopsis:"",
    image1:"",
    image2:"",
    image3:""
  };
  inputChange = event => {
    this.setState({userInput: event.target.value});
    

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a13b713c8527c9f9d0ed08581ad261b7&language=fr&query=${this.state.userInput}`)
    .then(res =>{
      console.log(res);
      const result= res.data;
      this.setState({videoLink: result.results[0].id});
      this.setState({synopsis: result.results[0].overview});
      this.setState({image1: `https://image.tmdb.org/t/p/w500/${result.results[1].poster_path }`});
      this.setState({image2: `https://image.tmdb.org/t/p/w500/${result.results[2].poster_path }`});
      this.setState({image3: `https://image.tmdb.org/t/p/w500/${result.results[3].poster_path }`});

      console.log(this.state.image1);

    
      
   
    axios.get(`https://api.themoviedb.org/3/movie/${this.state.videoLink}/videos?language=fr&api_key=a13b713c8527c9f9d0ed08581ad261b7`)
          .then( res =>{
            
            const resultVideo =res.data.results[0].key;
            this.setState({video:`https://www.youtube.com/embed/${resultVideo}`})
  
    })  }) 
};
  fetchVideo = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a13b713c8527c9f9d0ed08581ad261b7&language=fr&query=${this.state.userInput}`)
    .then(res =>{
      console.log(res);
      const result= res.data;
      this.setState({videoLink: result.results[0].id});
      this.setState({synopsis: result.results[0].overview});
      this.setState({image1: `https://image.tmdb.org/t/p/w500/${result.results[1].poster_path }`});
      this.setState({image2: `https://image.tmdb.org/t/p/w500/${result.results[2].poster_path }`});
      this.setState({image3: `https://image.tmdb.org/t/p/w500/${result.results[3].poster_path }`});

    
      console.log(this.state.image1);

    
      
   
    axios.get(`https://api.themoviedb.org/3/movie/${this.state.videoLink}/videos?language=fr&api_key=a13b713c8527c9f9d0ed08581ad261b7`)
          .then( res =>{
            
            const resultVideo =res.data.results[0].key;
            this.setState({video:`https://www.youtube.com/embed/${resultVideo}`})
  
    })  })

        this.setState({userInput: ""});
      }

  
    render() {

        return (
    <div>
      <h1> Mon Youtube-Like</h1>
   <input value ={this.state.userInput} 
   onChange={this.inputChange} 
   type="text" 
   placeholder="Recherchez votre film ici"></input>
   
   <button onClick={this.fetchVideo}>Go</button>
   <div className="container">
   <iframe src={this.state.video} title="Video Youtube"></iframe>
   <p>{this.state.synopsis}</p>
   </div>
   <div className="container_suggestions">
   <p>Suggestions</p>
   <div>
     <img className="block_suggestion" src={this.state.image1} alt="image1"></img>
   </div>
   <div>
   <img className="block_suggestion" src={this.state.image2} alt="image2"></img>

   </div>
   <div >
   <img className="block_suggestion" src={this.state.image3} alt="image3"></img>

   </div>
   </div>

   </div>
    );
}
}

export default Video
