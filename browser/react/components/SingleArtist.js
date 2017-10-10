import React, {Component} from 'react';
import Songs from './Songs.js';
import AllAlbums from './AllAlbums.js';
import axios from 'axios';
import { Link, Route, HashRouter } from 'react-router-dom';

export default class SingleArtists extends Component{
	constructor(){
		super();
		this.state={
			selectedArtist:{},
			albums: [],
			songs:[]
		};
	}

	componentDidMount(){
		let artistId = this.props.match.params.artistId;
    	axios.get(`/api/artists/${artistId}`)
        .then(res => res.data)
        .then(selectedArtist => this.setState({selectedArtist}));

        axios.get(`/api/artists/${artistId}/albums`)
        .then(res => res.data)
        .then(albums => this.setState({albums}));

        axios.get(`/api/artists/${artistId}/songs`)
        .then(res => res.data)
        .then(songs => this.setState({songs}));
    }

    render(){
	  const artist = this.state.selectedArtist; // or however you've named it

	  return (
	    <div>
	      <h3>{ artist.name }</h3>
	      <ul className="nav nav-tabs">
	        <li><Link to={`/artists/${this.props.match.params.artistId}/albums`}>ALBUMS</Link></li>
	        <li><Link to={`/artists/${this.props.match.params.artistId}/songs`}>SONGS</Link></li>
	      </ul>
	      <HashRouter>
		      <div>
		      	<Route path="/artists/:artistId/albums" render={() => <AllAlbums albums={this.state.albums}/>} />
		      	<Route path="/artists/:artistId/songs" render={() => <Songs songs={this.state.songs}/>} />
		      </div>
	      </HashRouter>
	    </div>
	  );
    }
}