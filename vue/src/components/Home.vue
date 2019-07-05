<template>
  <div>
    <div id="main">
      <div id="top">
      </div>      
      <div id="content">
        <div class="imagePart">
          <button class="btn" @click="tackPhoto">拍攝照片</button>
          <button class="btn" @click="clearImg">清除照片</button>          
        </div>
        <img v-bind:src="imgSrc" class="photo">
        
        <div class="geolocationPart">
          <button class="btn" @click="getGeolocation">geolocation</button><br>
          經度:{{Longitude}}<br>緯度:{{Latitude}}
          <br>          
        </div>
        <div class="weatherPart">
          <button class="btn" @click="getWeather">getWeather</button>
          <br>
          氣溫：{{weatherTemp}}
          <br>
          氣候：{{weatherDescription}}
          <br>
          <img v-bind:src="weatherImg">
        </div>
        
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
      </div>

      <div id="footer">
        <p>南台科技大學 資訊管理所 蔡宗叡2.0</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Plugins } from "@capacitor/core";
import { CameraResultType } from "@capacitor/core";
import { FilesystemDirectory, FilesystemEncoding } from "@capacitor/core";

const { Camera } = Plugins;
const { Filesystem } = Plugins;
const { Device } = Plugins;
const { Geolocation } = Plugins;

export default {
  name: "Home",
  data() {
    return {
      imgSrc: '',
      image: '',
      //for device information
      deviceInformation: null,
      deviceModel: null,
      devicePlatform: null,
      //for geolocation
      Longitude: 0,
      Latitude: 0,
      LongitudeBackend: 0,
      LatitudeBackend: 0,
      //for weatherAPI
      getWeatherData: null,
      weatherTemp: null,
      weatherDescription: null,
      weatherImg: null
    };
  },
  methods: {
    async tackPhoto() {
      this.image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        saveToGallery: true,
        allowEditing: false,
        // height: 300,
        quality: 100
      });
      this.imgSrc = this.image.webPath;
    },
    clearImg() {
      this.imgSrc = "";
      console.log("imgSrc",this.imgSrc)

    },
    async deviceIfo() {
      this.deviceInformation = await Device.getInfo();
      this.devicePlatform = this.deviceInformation.platform
      this.deviceModel = this.deviceInformation.model;
      console.log('home page',this.devicePlatform);
    },
    async getGPS() {
      this.deviceInformation = await Device.getInfo();
      //透過UUID偵測electron平台
      if (this.deviceInformation.platform == 'electron') {
        this.LongitudeBackend = 120.22;
        this.LatitudeBackend = 23.02;
        console.log(this.LongitudeBackend, this.LatitudeBackend);
      } else {
        this.geolocationinf = await Geolocation.getCurrentPosition();
        console.log("Current", this.geolocationinf);
        //將取得的座標資訊傳到data
        this.LongitudeBackend =
          Math.round(this.geolocationinf.coords.longitude * 100) / 100;
        this.LatitudeBackend =
          Math.round(this.geolocationinf.coords.latitude * 100) / 100;
      }
    },
    getGeolocation() {
      this.Longitude = this.LongitudeBackend;
      this.Latitude = this.LatitudeBackend;
    },
    getWeather() {
      this.axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            this.LatitudeBackend
          }&lon=${
            this.LongitudeBackend
          }&APPID=9c39fa3ce9d953fdd507d7d9f77093ef&units=metric`
        )
        .then(res => {
          this.getWeatherData = res;
          console.log(this.getWeatherData);
          console.log(this.getWeatherData.data.main.temp);
          this.weatherTemp = `${this.getWeatherData.data.main.temp} °C`;
          this.weatherDescription = this.getWeatherData.data.weather[0].description;
          if (this.deviceInformation.platform == 'electron') {
            //因為electron的圖片路徑不同，所以要特別判斷
            this.weatherImg = `../app/static/img/${
              this.getWeatherData.data.weather[0].icon
            }.png`;
          } else {
            this.weatherImg = `../static/img/${
              this.getWeatherData.data.weather[0].icon
            }.png`;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    
  },
  mounted() {
    this.deviceIfo();
    this.getGPS();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
/* img {
  max-width: 100%;
} */
#main {
  color: #fff;
  padding: 0.5rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  display: flex;
  flex-direction: column;
}
#top {
  max-width: 100%;
  font-weight: normal;
  background-color: #cf9a97;
}
.line {
  width: 30px;
  height: 3px;
  background-color: #797979;
  margin: 3px;
}
#hamburger {
  position: fixed;
  cursor: pointer;
  right: 5%;
  top: 20%;
  background-color: rgba(0, 0, 0, 0.8);
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-content: center;
  border-radius: 100%;
}
#content {
  padding: 15px;
}
 .photo {
  width: auto;
  height: auto;
  max-width: 85vw;
  max-height: 100%;
  margin-bottom: 15px;
} 
#footer {
  padding: 1.2em;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}

.btn {
  border: 0;
  background-color: #fff;
  color: #555555;
  border-radius: 5px;
  cursor: pointer;
  width: 150px;
  height: 50px;
  font-size: 1.25rem;
  white-space: nowrap;
  margin: 2px;
}
.btn:hover {
  background-color: #c8c8c8;
}
@media only screen and (min-width: 750px) {
  /*web part*/
  #main {
    padding: 0px;
  }
  #top {
    display: flex;
    padding: 15px 0px 5px 15px;
    flex-direction: column;
    align-items: flex-start;
    background-color: #555555;
  }
  #top h1,
  h4 {
    margin-block-start: 0;
  }
  #nav-bar {
    display: flex;
    flex-direction: row;
    background-color: #8d8594;
    padding: 10px 0px 10px 10px;
    font-size: 18px;
  }
  .nav-bar-item {
    margin: 8px;
  }
  #hamburger {
    display: none;
  }
  #content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .geolocationPart {
  }
  .weatherPart {
  }
}
</style>
