import React, {Component}from 'react';

const api = {
  key: "860731b0511c1576f1164631c1add3ac",
  base: "http://api.openweathermap.org/data/2.5"
}


class App extends Component {
  
  state = {
    query: "",
    weather: {}
  }
  
  render(){
    

    const search = evt => {
      if (evt.key === "Enter") {
        fetch(`${api.base}/weather?q=${this.state.query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => 
          this.setState({weather: result, query: ""})
          
          
        )}
    }


    const dateBuilder = (d) => {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
  
      return `${day} ${date} ${month} ${year}`
    }

    return (
      
      <div className={
        (typeof this.state.weather.main != 'undefined')
        ? ((this.state.weather.main.temp > 16) 
        ? 'app warm' 
        : 'app') 
        : 'app'}>
        <main>
          <div className="search-box">
            <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => this.setState({query: e.target.value})}
            value={this.state.query}
            onKeyPress={search}
            />
          </div>
          {(typeof this.state.weather.main != "undefined") ? (
          <div>
          <div className="location-box">
          <div className="location">{this.state.weather.name}, {this.state.weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
          <div className="temp">{Math.round(this.state.weather.main.temp)}°C</div>
          <div className="weather">{this.state.weather.weather[0].main}</div>
          </div>
          </div>
          ) : ("")}
        </main>
      </div>
    );

  }
 
}

export default App;
