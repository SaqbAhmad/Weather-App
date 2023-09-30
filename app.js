let Weather={
    ApiKey:"75edc3d1748e47d9d1820f65430c58d0",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+city+ "&units=metric&appid=" +
            this.ApiKey
        )
        // .then((response)=>response.json())
        // // .then((data)=> console.log(data));
        // .then((data)=> this.displayWeather(data))
        .then((response)=>{
            if(!response.ok){
                alert("No weather found.");
                throw new Error("No weather found.");
            }
            return response.json();
        })
        .then((data)=>this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name}=data;
        const {temp, humidity}=data.main;
        const{icon, description}=data.weather[0];
        const {speed}=data.wind;
        // console.log(name, temp, humidity, icon, description, speed);
        document.querySelector(".city").innerText="Weather in " + name;
        document.querySelector(".temp").innerText= temp + " °C";
        // console.log(temp, icon);
        // document.querySelector(".icon").src="https://openweathermap.org/img/wn/04n.png";
        document.querySelector(".icon").src="https://openweathermap.org/img/wn/"+ icon+ ".png"
        document.querySelector(".description").innerText=description;
        document.querySelector(".humidity").innerText="Humidity: " + humidity +"%";
        document.querySelector(".wind").innerText= "Wind speed: " + speed +"km/h";
        document.querySelector(".weather").classList.remove("loading");
        // console.log(document.querySelector(".search-bar").value)
        document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?" + name + "')";
        
    },
    search: function(){
       this.fetchWeather(document.querySelector(".search-bar").value);
    },
    
}
document.querySelector(".search button").addEventListener("click", function(){
     Weather.search();
})
document.querySelector(".search-bar").addEventListener("keyup",function(event){
      if(event.key=="Enter"){
        Weather.search();
      }
})
Weather.fetchWeather("Delhi");